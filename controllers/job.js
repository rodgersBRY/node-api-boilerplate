const {
  createJob,
  getJobById,
  getAllJobs,
  deleteJobById,
} = require("../models/job");

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobs();

    res.status(200).json({ jobs });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    console.log(jobId);

    const job = await getJobById(jobId);

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
      remote,
      applicationEmail,
      companyName,
      website,
      companyEmail,
      requirements,
      roles,
    } = req.body;

    console.log(req.body);

    const clientData = {
      name: companyName,
      website: website,
      companyEmail: companyEmail,
    };

    const jobData = {
      title: title,
      location: location,
      type: type,
      client: clientData,
      applicationEmail: applicationEmail,
      country: country,
      remote: remote,
      datePosted: new Date(),
      requirements: requirements,
      roles: roles,
    };

    const savedJob = await createJob(jobData);

    res.status(201).json({ result: savedJob });
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
