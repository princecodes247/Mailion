const express = require("express");
const router = express.Router();
const sendWarpMail = require("../utils/sendWarpMail");
const {Harpert} = require("../utils/harpert");

let User = new Harpert("users", "user");

router.get("/", (req, res) => {
  var axios = require('axios');
var data = JSON.stringify({
  "operation": "insert",
  "schema": "dev",
  "table": "dog",
  "records": [
    {
      "id": 1,
      "dog_name": "Penny",
      "owner_name": "Kyle",
      "breed_id": 154,
      "age": 7,
      "weight_lbs": 38
    }
  ]
});

var config = {
  method: 'post',
  url: 'https://veldora-princecodes.harperdbcloud.com',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization':"Basic YWRtaW46dmVsZG9yYWFkbWlu"
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

  //sendWarpMail(req, { warpID: 1, messages: [] });
  res.render("home");

});
router.get("/under-dev", (req, res) => {
  //sendWarpMail(req, { warpID: 1, messages: [] });
  res.render("under-dev");
});
router.get("/docs", (req, res) => {
  User.insert()
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
