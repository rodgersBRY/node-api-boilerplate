const emailjs = require("@emailjs/nodejs");
const { EMAIL_PRIVATE_KEY, EMAIL_PUBLIC_KEY } = require("../config/env");

class EmailService {
  init() {
    emailjs.init({
      privateKey: EMAIL_PRIVATE_KEY,
      publicKey: EMAIL_PUBLIC_KEY,
    });
  }

  async sendEmail(serviceId, templateId, data) {
    try {
      const res = await emailjs.send(serviceId, templateId, data);
      return res;
    } catch (err) {
      throw err;
    }
  }
}

const emailService = new EmailService();
emailService.init();

module.exports = emailService;
