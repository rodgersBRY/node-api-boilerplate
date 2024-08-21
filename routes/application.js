const app = require("express").Router();
const upload = require("../services/multer");
const controller = require("../controllers/application");

app
  .route("/")
  .get(controller.getApplications)
  .post(upload.single("cv"), controller.uploadCV);

app.route("/:id").get().delete();

module.exports = app;
