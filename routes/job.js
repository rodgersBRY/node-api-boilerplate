const app = require("express").Router();
const controller = require("../controllers/job");

app.route("/").get(controller.getJobs).post(controller.newJob);

app.route("/:id").get(controller.getJob).delete(controller.deleteJob);

module.exports = app;
