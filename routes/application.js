const app = require("express").Router(),
  upload = require("../services/multer"),
  controller = require("../controllers/application"),
  isAuthenticated = require("../middleware/authguard");

app
  .route("/")
  .get(isAuthenticated, controller.getApplications)
  .post(isAuthenticated, upload.single("cv"), controller.newApplication);

app.route("/user").get(isAuthenticated, controller.getUserApplications);
app.route("/:id").get(isAuthenticated, controller.getApplication);

module.exports = app;
