const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { throwError } = require("../helpers/error");
const { addUser, editUser, getUserByEmail } = require("../models/user");
const { googleSheetsService } = require("../services/google_sheets");
const { JWT_SECRET_TOKEN } = require("../config/env");

class AuthService {
  async register({ name, email, password, phone, role }) {
    const userExists = await getUserByEmail(email);
    if (userExists) throwError("account exists", 401);

    const hashedPass = await bcrypt.hash(password, 12);

    const userData = {
      name,
      email,
      phone,
      password: hashedPass,
      role: role || "candidate",
    };

    const user = await addUser(userData);

    // save user to google sheets
    let spreadData = [[name, email, phone, role]];
    await googleSheetsService(spreadData);

    return user;
  }

  async login({ email, password }) {
    const user = await getUserByEmail(email);
    if (!user) throwError("That user does not exist!", 404);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throwError("Wrong password!", 401);

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return { userId: user._id.toString(), loadedUser: user, token };
  }

  async update(id, userData) {
    if (userData.password) {
      const hashedPass = await bcrypt.hash(userData.password, 12);
      userData.password = hashedPass;
    }

    return await editUser(id, userData);
  }
}

module.exports = AuthService;
