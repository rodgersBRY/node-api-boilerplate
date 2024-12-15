const app = require("express").Router();
const upload = require("../config/multer");
const controller = require("../controllers/application");
const isAuthenticated = require("../middleware/authguard");

app
  .route("/")
  .get(isAuthenticated, controller.getApplications)
  .post(isAuthenticated, upload.single("cv"), controller.newApplication);

app.route("/user").get(isAuthenticated, controller.getUserApplications);
app.route("/:id").get(isAuthenticated, controller.getApplication);

module.exports = app;
