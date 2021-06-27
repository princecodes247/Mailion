const express = require("express");
const router = express.Router();
const sendWarpMail = require("../utils/sendWarpMail");
const BetaTester = require("../models/betaTester");

router.get("/", (req, res) => {
  //sendWarpMail(req, { warpID: 1, messages: [] });
  res.render("home");
});
router.get("/under-dev", (req, res) => {
  //sendWarpMail(req, { warpID: 1, messages: [] });
  res.render("under-dev");
});
router.get("/docs", (req, res) => {
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
