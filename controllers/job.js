const {
  createJob,
  getJobById,
  getAllJobs,
  deleteJobById,
} = require("../models/job");

const { throwError } = require("../helpers");

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobs();

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
      location,
      country,
      type,
      desc,
      tags,
      remote,
      applicationEmail,
      companyName,
      website,
      requirements,
      roles,
    } = req.body;

    console.log(req.body);

    if (
      title == "" ||
      country == "" ||
      type == "" ||
      applicationEmail == "" ||
      companyName == "" ||
      requirements == "" ||
      desc == ""
    )
      throwError("Required fields cannot be empty!", 404);

    const clientData = {
      name: companyName,
      website: website,
    };

    // separate the list values
    const tagsList = tags.split(",").map(item => item.trim());
    const rolesList = roles.split(",").map(item => item.trim());
    const requirementsList = requirements.split(",").map(item => item.trim());

    const jobData = {
      postedBy: req.userId,
      title: title,
      location: location,
      type: type,
      client: clientData,
      applicationEmail: applicationEmail,
      country: country,
      remote: remote,
      requirements: requirementsList,
      roles: rolesList,
      tags: tagsList,
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
