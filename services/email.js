const emailjs = require("@emailjs/nodejs");

const serviceId = process.env.FEEDBACK_SERVICE_ID;
const templateId = process.env.FEEDBACK_TEMPLATE_ID;
const publicKey = process.env.EMAIL_PUBLIC_KEY;
const privateKey = process.env.EMAIL_PRIVATE_KEY;

emailjs.init({
  privateKey: privateKey,
  publicKey: publicKey,
});

const emailClient = async (data) =>
  await emailjs.send(serviceId, templateId, data);

module.exports = emailClient;
