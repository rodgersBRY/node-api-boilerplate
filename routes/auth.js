const app = require("express").Router(),
  controller = require("../controllers/auth"),
  upload = require("../services/multer"),
  isAuthenticated = require("../middleware/authguard");

app.post("/register", controller.register);

app.post("/login", controller.login);

app.get("/users", controller.allUsers);

app.post("/upload", isAuthenticated, upload.single("cv"), controller.uploadCV);

app.post("edit-pass", controller.updatePassword);

module.exports = app;
