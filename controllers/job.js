const { throwError } = require("../helpers/error");

const JobsService = require("../services/jobs");
const jobsService = new JobsService();

exports.getJobs = async (req, res, next) => {
  try {
    const { salary, country, position } = req.query;

    let query = {};

    if (salary) query.location = salary.toLowerCase();
    if (position) query.title = position.toLowerCase();
    if (country) query.country = country.toLowerCase();

    const jobs = await jobsService.get(query);
    if (!jobs) throwError("jobs not found", 404);

    res.status(200).json({ jobs });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await jobsService.getOne({ _id: jobId });
    if (!job) throwError("job not found", 404);

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

exports.newJob = async (req, res, next) => {
  try {
    const { title, country, type, salary, currency, desc } = req.body;

    if (!title || !country || !type || !desc || !salary || !currency)
      throwError("More information is required about the job", 400);

    const job = await jobsService.create(req.body, req.userId);
    if (!job) throwError("error creating job", 404);

    res.status(201).json({ job });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await jobsService.delete(jobId);

    res.status(200).json({ deletedJob });
  } catch (err) {
    next(err);
  }
};

exports.restoreJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const restoredJob = await jobsService.restore(jobId);

    res.status(200).json({ restoredJob });
  } catch (err) {
    next(err);
  }
};
