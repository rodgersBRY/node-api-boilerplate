const app = require("express").Router();
const controller = require("../controllers/auth");

app.route("/register").post(controller.register);
app.route("/login").post(controller.login);

module.exports = app;
