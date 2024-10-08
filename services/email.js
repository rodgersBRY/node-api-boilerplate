const emailjs = require("@emailjs/nodejs");

const publicKey = process.env.EMAIL_PUBLIC_KEY;
const privateKey = process.env.EMAIL_PRIVATE_KEY;

emailjs.init({
  privateKey: privateKey,
  publicKey: publicKey,
});

const emailClient = async (serviceId, templateId, data) => {
  try {
    const res = await emailjs.send(serviceId, templateId, data);
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = emailClient;
