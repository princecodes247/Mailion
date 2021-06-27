const emailService = require("./nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendWarpMail = (req, warp) => {
  //TODO - ADD BASEURL TO ENV
  const baseUrl = req.protocol + "://" + req.get("host");

  const data = {
    from: process.env.EMAIL_USERNAME,
    to: req.body.email,
    subject: `New Message at ${warp.warpID}`,
    html: ` <h3 style=" color:rgb(92, 61, 180); font-size: xx-large; font-weight: lighter; font-family: sans-serif;">
      Message Details </h3>
      <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;">
      ${warp.messages[warp.messages.length - 1]}
      </p>
      <br>
      <br>
    <a href="${baseUrl}/warp/${
      warp.warpID
    }" target="_blank" style="text-decoration:none; cursor:pointer">  <button style="width: fit-content; background-color:rgb(146, 45, 212); color:white; border: none; appearance: none; outline:none; height:60px; border-radius: 10px 10px ;padding: 15px 15px;font-family: sans-serif; font-size: x-large; font-weight: lighter;"> 
         Check it out </button> </a>
         <br>
         <br>
         <br>
         <br>
         <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left; "> Have a noice day... </p>
         <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left;margin-top: 0px;"> From Mailion Team.</p>`,
  };

  emailService.sendMail(data, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Warp Mail Sent...");
      // res.redirect("/");
    }
  });
};

module.exports = sendWarpMail;
