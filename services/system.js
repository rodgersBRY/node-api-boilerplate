const AuthService = require("./user");
const { CREATE_ADMIN, ADMIN_EMAIL, ADMIN_PASS } = require("../config/env");

class SystemService {
  async init() {
    if (CREATE_ADMIN == "enabled") await this.createAdmin();
  }

  async createAdmin() {
    const authService = new AuthService();

    const adminData = {
      name: "Halisi Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASS,
      phone: "0712413243",
      role: "admin",
    };

    await authService.create(adminData);
  }
}

module.exports = SystemService;
