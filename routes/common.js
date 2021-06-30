const express = require("express");
const router = express.Router();
const sendWarpMail = require("../utils/sendCollectionMail");
const { Harpert } = require("../utils/harpert");
let User = new Harpert("users", "user");
let Collection = new Harpert("users", "collection");
let Code = new Harpert("users", "code");
let Review = new Harpert("users", "reviews");

router.get("/", (req, res) => {
  let locals = {
    layout: "layouts/static",
    title: `Home - ${process.env.APP_NAME}`,
  };
  res.render("home", locals);
});
router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/under-dev", (req, res) => {
  let locals = {
    layout: "layouts/static",
    title: `Under Construction - ${process.env.APP_NAME}`,
  };
  res.render("under-dev", locals);
});

router.get("/docs", (req, res) => {
  let locals = {
    layout: "layouts/static",
    title: `Documentation - ${process.env.APP_NAME}`,
  };
  res.render("docs", locals);
});

router.get("/faqs", (req, res) => {
  let locals = {
    layout: "layouts/static",
    title: `FAQs - ${process.env.APP_NAME}`,
  };
  res.render("faqs", locals);
});

router.get("/404", (req, res) => {
  let locals = {
    layout: "layouts/static",
    title: `404 Empty - ${process.env.APP_NAME}`,
  };
  res.render("404", locals);
});

router.get("/confirm-email", (req, res) => {
  res.render("confirm-email", { layout: "layouts/static" });
});

router.post("/newsletter", (req, res) => {
  let { email } = req.body;
  let userData = {
    email,
  };
  // BetaTester.insert(userData)
  //   .then((resp) => {
  //     console.log("beta tester added");
  //     res.json("Added to waitlist");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

router.post("/review", (req, res) => {
  let { email } = req.body;
  let userData = {
    email,
  };
  Review.insert(userData)
    .then((resp) => {
      console.log("review added");
      res.json("Added to reviews");
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


//

