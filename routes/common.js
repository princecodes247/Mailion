const express = require("express");
const router = express.Router();
const sendWarpMail = require("../utils/sendCollectionMail");
const { Harpert } = require("../utils/harpert");

let User = new Harpert("users", "user");

router.get("/", (req, res) => {

  //sendWarpMail(req, { warpID: 1, messages: [] });
});
router.get("/under-dev", (req, res) => {
  //sendWarpMail(req, { warpID: 1, messages: [] });
  res.render("under-dev");
});
router.get("/docs", (req, res) => {
// let user = {
//   userName: "kyle",
//   email: "kyley@gmail.com",
//   password: "passy",
//   plan: 0,
//   level: 0,
//   status: "active",
//   collections: [],
// };
// User.insert(user)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(`${err} is an error`);
//   });
  res.json("docs");
});

router.get("/404", (req, res) => {
  res.render("docs");
});

router.get("/confirm-email", (req, res) => {
  res.render("confirm-email");
});

router.post("/waitlist", (req, res) => {
  let { email } = req.body;
  let userData = {
    email,
  };
  BetaTester.create(userData)
    .then((resp) => {
      console.log("beta tester added");
      res.json("Added to waitlist");
    })
    .catch((err) => {
      console.log(err);
    });
});

//FIX THESE ROUTES
// router.get("/faq", (req, res) => {
//   res.render("faq");
// });

module.exports = router;
