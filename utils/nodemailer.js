const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const emailService = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});
module.exports = emailService;
