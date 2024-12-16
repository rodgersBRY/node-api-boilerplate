const EmailClient = require("../config/email");
const { throwError } = require("../helpers/error");
const ApplicationsService = require("../services/application");
const UserService = require("../services/user");
const JobsService = require("../services/jobs");
const { uploadFile } = require("../helpers/buffer_stream");
const { JOBS_SERVICE_ID, JOBS_TEMPLATE_ID } = require("../config/env");

const appService = new ApplicationsService();
const userService = new UserService();
const jobsService = new JobsService();

const emailClient = new EmailClient();

exports.getApplications = async (req, res, next) => {
  try {
    const { user, job } = req.query;

    let query = {};

    if (user) query.user = user;
    if (job) query.job = job;

    const applications = await appService.get(query);
    if (!applications) throwError("Applications cannot be retrieved!", 404);

    res.status(200).json({ applications });
  } catch (err) {
    next(err);
  }
};

exports.getUserApplications = async (req, res, next) => {
  try {
    const applications = await appService.get({ user: req.userId });

    if (!applications) throwError("Applications cannot be retrieved!", 404);

    res.status(200).json({ applications });
  } catch (err) {
    next(err);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const id = req.params.id;

    const application = await appService.findOne({ _id: id });

    if (!application) throwError("Application cannot be retrieved!", 404);

    res.status(200).json({ application });
  } catch (err) {
    next(err);
  }
};

exports.newApplication = async (req, res, next) => {
  const { jobId, country } = req.body;

  let cvUrl = "";

  try {
    if (!country) throwError("'Country' field is required", 400);

    const appExists = await appService.findOne({
      user: req.userId,
      job: jobId,
    });
    if (appExists)
      throwError("you've already applied, Kindly wait for feedback", 409);

    if (req.file) {
      max_size = 10 * 1024 * 1024;

      if (req.file.size > max_size) throwError("Your file exceeds 10MB");

      const { secure_url } = await uploadFile(req.file, "cv", "raw");
      cvUrl = secure_url;
    }

    const applicationData = {
      user: req.userId,
      job: jobId,
      cvUrl: cvUrl,
      country: country,
    };

    const application = await appService.create(applicationData);

    res.status(201).json({ application });
  } catch (err) {
    next(err);
  }

  try {
    const { name, email, phone } = await userService.findOne({
      _id: req.userId,
    });
    const { title } = await jobsService.getOne({ _id: jobId });

    const emailData = {
      name,
      email,
      phone,
      job: title,
      cvUrl,
      country,
    };

    await emailClient.sendEmail(JOBS_SERVICE_ID, JOBS_TEMPLATE_ID, emailData);
  } catch (err) {
    next(err);
  }
};
