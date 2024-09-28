const emailClient = require("../services/email");

exports.feedback = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const emailBody = {
      name,
      email,
      phone,
      subject,
      message,
    };

    const result = await emailClient(emailBody);

    res.status(result.status).json({ message: result.text });
  } catch (err) {
    next(err);
  }
};
