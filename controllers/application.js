const {} = require("../helpers");
const { newApplication } = require("../models/application");

exports.getApplications = async (req, res, next) => {};

exports.getUserApplications = async (req, res, next) => {};

exports.getApplication = async (req, res, next) => {};

exports.newApplication = async (req, res, next) => {
  const { name, jobId, location, country, pTitle, skills, urls } = req.body;

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
};

exports.uploadCV = async (req, res, next) => {};
