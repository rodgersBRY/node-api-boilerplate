const app = require("express").Router(),
  upload = require("../services/multer"),
  controller = require("../controllers/application"),
  isAuthenticated = require("../middleware/authguard");

app
  .route("/")
  .get(controller.getApplications)
  .post(isAuthenticated, upload.single("cv"), controller.newApplication);

app.route("/user/:userId").get(isAuthenticated, controller.getUserApplications);
app.route("/:id").get(isAuthenticated, controller.getApplication);

module.exports = app;
