const { throwError } = require("../helpers");
const {
  allApplications,
  applicationsByUserId,
  applicationById,
  newApplication,
  userApplicationByJobId,
} = require("../models/application");
const uploadFromBuffer = require("../services/buffer_stream");

exports.getApplications = async (req, res, next) => {
  try {
    const applications = await allApplications();

    if (!applications) throwError("Applications cannot be retrieved!", 404);

    res.status(200).json({ applications });
  } catch (err) {
    next(err);
  }
};

exports.getUserApplications = async (req, res, next) => {
  try {
    const applications = await applicationsByUserId(req.userId);

    if (!applications) throwError("Applications cannot be retrieved!", 404);

    res.status(200).json({ applications });
  } catch (err) {
    next(err);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    const application = await applicationById(id);

    if (!application) throwError("Application cannot be retrieved!", 404);

    res.status(200).json({ application });
  } catch (err) {
    next(err);
  }
};

exports.newApplication = async (req, res, next) => {
  try {
    const { name, jobId, location, country, pTitle, skills, urls } = req.body;

    const applicationExists = await userApplicationByJobId(jobId, req.userId);

    if (applicationExists)
      throwError("You have already applied for this job", 409);

    if (name == "" || country == "" || pTitle == "")
      throwError("Some required fields are empty", 400);

    if (!req.file) throwError("Attach your CV", 401);

    max_size = 10 * 1024 * 1024;

    if (req.file.size > max_size) throwError("Your file exceeds 10MB");

    const originalName = req.file.originalname.split(".")[0]; // Extract the original filename without extension
    const timestamp = Date.now();

    const file_data = {
      name: originalName,
      timestamp: timestamp,
    };

    const { secure_url } = await uploadFromBuffer(req.file.buffer, file_data);

    const applicationData = {
      userId: req.userId,
      jobId: jobId,
      applicantName: name,
      cvUrl: secure_url,
      location: location,
      country: country,
      pTitle: pTitle,
      skills: skills,
      // urls: urls,
    };

    const result = await newApplication(applicationData);

    res.status(201).json({ message: "application submitted!", result });
  } catch (err) {
    next(err);
  }
};
