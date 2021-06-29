const axios = require('axios');
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const sendResetCode = require("../utils/sendResetCode");
const sendActivationMail = require("../utils/sendActivationMail");
const idGenerator = require("../utils/idGenerator");
const { Harpert } = require("../utils/harpert");
let Collection = new Harpert("users", "collection");
let User = new Harpert("users", "user");
const passport = require("passport");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/admin", ensureAuthenticated, (req, res, next) => {
  if (req.user.level == 3) {
    User.find().then((result) => {
      let temp = ({ userName, email, dateCreated, warps, status } = result);
      res.render("admin", {
        users: temp,
      });
    });
    next();
  }
  res.redirect("/dashboard");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login", { error: { type: "none" } });
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  let user = req.user;

 // Collection.find({ userName: user.userName }).then((warps) => {
    res.render("dashboard", { user });
  // });
});

router.get("/settings", ensureAuthenticated, (req, res) => {
  res.render("settings");
});
router.post("/settings", ensureAuthenticated, (req, res) => {
  res.json("hi");
});

//Remove the username in link

// Register User
router.post("/register", (req, res) => {
  let { userName, email, password, password2 } = req.body;

  console.log(`${req.body} is req.body line 54 users.js`);
  userName = userName.toString().trim();
  email = email.toString().trim();
  password = password.toString().trim();
  password2 = password2.toString().trim();
  let userData = {
    userName,
    email,
    password,
    plan: 0,
    level: 0,
    status: "active",
  collections: [],
  };
  User.findOne({
    email: email
  })
    .then((user) => {
      if (!user) {
        console.log(`No user found line 72 users.js`);
        if (password == password2) {
          bcrypt.hash(password, 10, (err, hash) => {
            userData.password = hash;
            User.insert(userData)
              .then((info) => {
                console.log(`${info} line 78 users.js`);
                let id = JSON.parse(info).inserted_hashes[0];
                console.log(`${id} line 80 users.js`);
                User.findById(id)
                .then(user=>{
                  console.log(`${user} Registered at findById at line 83 users.js`);
                  //sendActivationMail(req, user);
                  req.login(user, err=>{
                    if(err){
                      console.log(`${err} line 87 req.login users.js`);
                    }
                    res.redirect("/login")
                  })
                }).catch(err=> console.log(`${err} at line 91 findById users.js`))
          }).catch(err=> console.log(`${err} at line 92 insert users.js`))
        })
        } else {
          res.json({ error: "Password do not match" });
        }
      } else {
        console.log(`${user} USER FOUND! line 97 users.js`)
        res.json({ error: "The provided email is registered already" });
        return;
      }
    })
    .catch((err) => {
      res.send({ error: err });
      return;
    });
});

// Login User
router.post("/login", forwardAuthenticated, (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next)
});
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
