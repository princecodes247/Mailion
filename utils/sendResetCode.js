const emailService = require("./nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendResetCode = (req, user, token) => {
  //TODO - ADD BASEURL TO ENV
  const baseUrl = req.protocol + "://" + req.get("host");

  // Send Confirmation Email
  const data = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Password Reset Code",
    html: ` <h3 style=" color:rgb(92, 61, 180); font-size: 50px; font-weight: lighter; font-family: sans-serif;">
    ${process.env.APP_NAME} </h3>
      <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;">
      You are receiving this because you (or someone else) have requested the reset of the password for your account </p>
      <br>
      <a href="${baseUrl}/reset/${token}" target="_blank" style="text-decoration:none; cursor:pointer">  <button style="width: fit-content; background-color:rgb(146, 45, 212); color:white; border: none; appearance: none; height:60px; border-radius: 10px 10px ;padding: 15px 15px;font-family: sans-serif; font-size: x-large; font-weight: lighter;"> 
      Reset your Password </button> </a>
      <br>
      <p style="font-size: x-large;">
      OR 
      <br>
      Paste this into your browser to complete the process: ${baseUrl}/reset/${token}  </p>
      <br>
      <code style="font-size: x-large;> If you did not request this, please ignore this email and your password will remain unchanged.</code>
    <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left;margin-top: 0px;"> ${process.env.APP_NAME} Team.</p>`,
  };

  emailService.sendMail(data, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Reset Email Sent...");
    }
  });
};

module.exports = sendResetCode;
