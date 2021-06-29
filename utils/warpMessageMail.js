const emailService = require("./nodemailer");
const cryptoRandomString = require("crypto-random-string");
const Code = require("../models/secretCode");
const dotenv = require("dotenv");

dotenv.config();

const sendMessMail = (req, user, warp) => {
  // Send Confirmation Email
  //TODO - ADD BASEURL TO ENV
  const baseUrl = req.protocol + "://" + req.get("host");
  const secretCode = cryptoRandomString({
    length: 6,
  });
  const codeData = {
    code: secretCode,
    email: req.body.email,
  };

  Code.create(codeData)
    .then(() => {
      console.log("Saved Code");
    })
    .catch(() => {
      console.log("Error Ocurred");
    });

  const data = {
    from: process.env.EMAIL_USERNAME,
    to: req.body.email,
    subject: `New Message at ${warp?.warpID}`,
    html: ` <h3 style=" color:rgb(92, 61, 180); font-size: xx-large; font-weight: lighter; font-family: sans-serif;">
      Welcome to ${process.env.APP_NAME} </h3>
      <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;">
         Glad to see you join our ever-growing inverstment platform.
         <br>
         Just one more step to go...
         <br>
            Verify your account now and discover a new world of financial possibilities !!</p>
      <br>
      <br>
    <a href="${baseUrl}/verification/verify-account/${user._id}/${secretCode}" target="_blank" style="text-decoration:none; cursor:pointer">  <button style="width: fit-content; background-color:rgb(146, 45, 212); color:white; border: none; appearance: none; outline:none; height:60px; border-radius: 10px 10px ;padding: 15px 15px;font-family: sans-serif; font-size: x-large; font-weight: lighter;"> 
         Verify your Email Address </button> </a>
         <br>
         <br>
         <br>
         <br>
         <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left; "> Thank you... </p>
         <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left;margin-top: 0px;"> ${process.env.APP_NAME} Team.</p>`,
  };

  emailService.sendMail(data, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Confirmation Email Sent...");
      res.redirect("/confirm-email");
    }
  });
};

module.exports = sendActivationMail;
