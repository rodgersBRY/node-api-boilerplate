const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { throwError } = require("../helpers");
const { addUser, editUser, getUserByEmail } = require("../models/user");

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

    const user = await addUser(userData);

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET_TOKEN
    );

    res.status(201).json({ msg: "successfully registered!", user, token });
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
      process.env.JWT_SECRET_TOKEN
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
