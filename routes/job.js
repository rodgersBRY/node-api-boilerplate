const app = require("express").Router(),
  controller = require("../controllers/job"),
  isAuthenticated = require("../middleware/authguard");

app.route("/").get(controller.getJobs).post(isAuthenticated, controller.newJob);

app
  .route("/:id")
  .get(controller.getJob)
  .delete(isAuthenticated, controller.deleteJob);

module.exports = app;
