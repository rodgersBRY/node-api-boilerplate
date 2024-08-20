const app = require("express").Router();
const controller = require("../controllers/job");
const isAuthenticated = require("../middleware/authguard")

app.route("/").get(controller.getJobs).post(isAuthenticated, controller.newJob);

app.route("/:id").get(controller.getJob).delete(isAuthenticated, controller.deleteJob);

module.exports = app;
