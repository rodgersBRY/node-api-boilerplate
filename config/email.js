const emailjs = require("@emailjs/nodejs");
const { EMAIL_PRIVATE_KEY, EMAIL_PUBLIC_KEY } = require("../config/env");

emailjs.init({
  privateKey: EMAIL_PRIVATE_KEY,
  publicKey: EMAIL_PUBLIC_KEY,
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
