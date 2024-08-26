const app = require("express").Router(),
  controller = require("../controllers/auth"),
  upload = require("../services/multer"),
  isAuthenticated = require("../middleware/authguard");

app.route("/register").post(controller.register);

app.route("/login").post(controller.login);

app
  .route("/upload")
  .post(isAuthenticated, upload.single("cv"), controller.updateCV);

module.exports = app;
