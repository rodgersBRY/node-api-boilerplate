const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwError } = require("../helpers/error");
const { JWT_SECRET_TOKEN } = require("../config/env");

const AuthService = require("../services/user");
const GoogleSheetsService = require("../services/google_sheets");
const authService = new AuthService();

exports.getUsers = async (req, res, next) => {
  const users = await authService.get();

  res.status(200).json({ users });
};

exports.register = async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;

  try {
    if (!req.body) throwError("all fields are required", 401);

    const user = await authService.create({
      name,
      email,
      password,
      phone,
      role,
    });

    const googleSheetsService = new GoogleSheetsService();

    let spreadData = [[name, email, phone, role]];

    await googleSheetsService.newEntry(spreadData);

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authService.findOne({ email });
    if (!user) throwError("account not found", 404);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throwError("Wrong password!", 401);

    const token = jwt.sign(
      { email: user.email, userId: user.toString() },
      JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ userId: user._id, user, token });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { email } = req.query;

  try {
    const updatedUser = await authService.update({ email }, req.body);
    res.status(201).json({ updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.updateCV = async (req, res, next) => {
  try {
    if (!req.file) throwError("Attach your CV", 401);

    const { secure_url } = await uploadFromBuffer(req.file);

    const updatedUser = await editUser(req.userId, { cvUrl: secure_url });

    res.status(201).json({ message: "CV uploaded successfully", updatedUser });
  } catch (err) {
    next(err);
  }
};
