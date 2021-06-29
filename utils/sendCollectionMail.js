const emailService = require("./nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendCollectionMail = (req, collection) => {
  //TODO - ADD BASEURL TO ENV
  const baseUrl = req.protocol + "://" + req.get("host");

  const data = {
    from: process.env.EMAIL_USERNAME,
    to: req.body.email,
    subject: `New Message at ${collection.collectionID}`,
    html: ` <h3 style=" color:rgb(92, 61, 180); font-size: xx-large; font-weight: lighter; font-family: sans-serif;">
      Message Details </h3>
      <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;">
      ${collection.messages[collection.messages.length - 1]}
      </p>
      <br>
      <br>
    <a href="${baseUrl}/collection/${
      collection.collectionID
    }" target="_blank" style="text-decoration:none; cursor:pointer">  <button style="width: fit-content; background-color:rgb(146, 45, 212); color:white; border: none; appearance: none; outline:none; height:60px; border-radius: 10px 10px ;padding: 15px 15px;font-family: sans-serif; font-size: x-large; font-weight: lighter;"> 
         Check it out </button> </a>
         <br>
         <br>
         <br>
         <br>
         <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left; "> Have a noice day... </p>
         <p style="font-size: x-large; font-weight: lighter; font-family: sans-serif;text-align: left;margin-top: 0px;"> From ${process.env.APP_NAME} Team.</p>`,
  };

  emailService.sendMail(data, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Collection Mail Sent...");
      // res.redirect("/");
    }
  });
};

module.exports = sendCollectionMail;
