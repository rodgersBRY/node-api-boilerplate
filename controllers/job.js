const {
  createJob,
  getJobById,
  getAllJobs,
  deleteJobById,
} = require("../models/job");

const { throwError } = require("../helpers");

exports.getJobs = async (req, res, next) => {
  try {
    const { salary, country, position } = req.query;

    let query = {};

    if (salary) query.location = salary.toLowerCase();
    if (position) query.title = position.toLowerCase();
    if (country) query.country = country.toLowerCase();

    const jobs = await getAllJobs(query);

    if (!jobs) throwError("Cannot retrieve any jobs!", 404);

    res.status(200).json({ jobs });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await getJobById(jobId);

    if (!job) throwError("Cannot retrieve job details!", 404);

    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

exports.newJob = async (req, res, next) => {
  try {
    const {
      title,
      country,
      type,
      desc,
      salary,
      applicationEmail,
      requirements,
      roles,
    } = req.body;

    if (
      title == "" ||
      country == "" ||
      type == "" ||
      applicationEmail == "" ||
      requirements.length <= 0 ||
      roles.length <= 0 ||
      desc == ""
    )
      throwError("Required fields cannot be empty!", 404);

    const jobData = {
      postedBy: req.userId,
      title: title.toLowerCase(),
      type: type,
      salary: salary,
      country: country.toLowerCase(),
      requirements: requirements,
      roles: roles,
      desc: desc,
    };

    const result = await createJob(jobData);

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await deleteJobById(jobId);

    res.status(200).json({ message: "The job has been deleted", deletedJob });
  } catch (err) {
    next(err);
  }
};
