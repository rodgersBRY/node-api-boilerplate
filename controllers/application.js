const { throwError } = require("../helpers");
const {
  allApplications,
  applicationsByUserId,
  applicationById,
  newApplication,
  userApplicationByJobId,
} = require("../models/application");

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
    const userId = req.params.userId || req.userId;

    const applications = await applicationsByUserId(userId);

    if (!applications) throwError("Applications cannot be retrieved!", 404);

    res.status(200).json({ applications });
  } catch (err) {
    next(err);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const id = req.params.id;

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

    if (name == "" || country == "" || pTitle == "" || !req.file)
      throwError(
        "Some required fields are empty or your CV is not attached",
        400
      );

    const cvUrl = `/uploads/${req.file.filename}`;

    const applicationData = {
      userId: req.userId,
      jobId: jobId,
      applicantName: name,
      cvUrl: cvUrl,
      location: location,
      country: country,
      pTitle: pTitle,
      skills: skills,
    };

    const result = await newApplication(applicationData);

    res.status(201).json({ message: "application submitted!", result });
  } catch (err) {
    next(err);
  }
};