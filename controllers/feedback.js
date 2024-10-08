const emailClient = require("../services/email");
const { throwError } = require("../helpers");

exports.webFeedback = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;
  const serviceId = process.env.FEEDBACK_SERVICE_ID;
  const templateId = process.env.FEEDBACK_TEMPLATE_ID;

  try {
    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      subject == "" ||
      message == ""
    )
      throwError("All fields are required", 400);

    const emailBody = {
      name,
      email,
      phone,
      subject,
      message,
    };

    await emailClient(serviceId, templateId, emailBody);

    res.status(200).json({ msg: "sent" });
  } catch (err) {
    next(err);
  }
};

exports.applyFeedback = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;
  const serviceId = process.env.FEEDBACK_SERVICE_ID;
  const templateId = process.env.FEEDBACK_TEMPLATE_ID;

  try {
    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      subject == "" ||
      message == ""
    )
      throwError("All fields are required", 400);

    const emailBody = {
      name,
      email,
      phone,
      subject,
      message,
    };

    await emailClient(serviceId, templateId, emailBody);

    res.status(200).json({ msg: "sent" });
  } catch (err) {
    next(err);
  }
};

exports.bookingFeedback = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;
  const serviceId = process.env.FEEDBACK_SERVICE_ID;
  const templateId = process.env.FEEDBACK_TEMPLATE_ID;

  try {
    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      subject == "" ||
      message == ""
    )
      throwError("All fields are required", 400);

    const emailBody = {
      name,
      email,
      phone,
      subject,
      message,
    };

    await emailClient(serviceId, templateId, emailBody);

    res.status(200).json({ msg: "sent" });
  } catch (err) {
    next(err);
  }
};
