const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { throwError } = require("../helpers");
const {
  getUsers,
  addUser,
  editUser,
  getUserByEmail,
} = require("../models/user");

exports.allUsers = async (_, res, next) => {
  try {
    const users = await getUsers();

    if (!users) throwError("Error fetching users", 404);

    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await getUserByEmail(email);

    if (userExists) throwError("An account with that email exists!", 409);

    const hashedPass = await bcrypt.hash(password, 12);

    const userData = {
      name: name,
      email: email,
      password: hashedPass,
      role: role || "candidate",
    };

    await addUser(userData);

    res.status(201).json({ msg: "successfully registered!" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let loadedUser;

  try {
    const user = await getUserByEmail(email);

    if (!user) throwError("That user does not exist!", 404);

    loadedUser = user;

    const passwordMatch = await bcrypt.compare(password, loadedUser.password);
    if (!passwordMatch) throwError("Wrong password!", 401);

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      userId: loadedUser._id.toString(),
      loadedUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!email) throwError("Please enter an email address", 401);

    const userExists = await getUserByEmail(email);

    if (!userExists)
      throwError("No user with that email exists. Please register", 404);

    // update password
    const hashedPass = await bcrypt.hash(newPassword, 12);

    userExists.password = hashedPass;

    const updatedUser = await userExists.save();

    res
      .status(201)
      .json({ message: "Password was updated successfully", updatedUser });
  } catch (err) {}
};

exports.uploadCV = async (req, res, next) => {
  const cvUrl = `/uploads/${req.file.filename}`;

  try {
    const updatedUser = await editUser(req.userId, { cvUrl: cvUrl });

    res.status(201).json({ message: "CV uploaded successfully", updatedUser });
  } catch (err) {
    next(err);
  }
};
