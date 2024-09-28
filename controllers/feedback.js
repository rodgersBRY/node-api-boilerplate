const emailClient = require("../services/email");
const { throwError } = require("../helpers");

exports.feedback = async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;

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
    
    await emailClient(emailBody);

    res.status(200).json({ msg: "sent" });
  } catch (err) {
    next(err);
  }
};
