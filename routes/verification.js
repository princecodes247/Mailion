const Code = require("../models/secretCode");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendCode = require("../utils/sendCode");

// User Account Verification
router.get(
  "/verification/verify-account/:userId/:secretCode",
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const response = await Code.findOne({
        email: user.email,
        code: req.params.secretCode,
      });

      if (!user) {
        console.log("User not found");
      } else {
        await User.updateOne({ email: user.email }, { status: "active" });
        await Code.deleteMany({ email: user.email });

        let redirectPath = `/account/verified`;

        res.redirect(redirectPath);
      }
    } catch (err) {
      console.log("Verification failed...");
    }
  }
);

// Verification Redirect Route
router.get("/account/verified", (req, res) => {
  res.render("confirm-email");
  //   res.redirect("/home");
  // res.redirect("/home")
});

// Password Reset Route #1
// Sends Reset Link to a Registered Email Address
router.post("/forgot", (req, res) => {
  const email = req.body.email;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.json({ message: "This email address is not registered" });
      } else {
        const token = cryptoRandomString({ length: 12 });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save((err, user) => {
          if (err) return console.log({ err });
          console.log("Token updated");
          sendCode(req, user, token);
        });
      }
      return;
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// Password Reset Route #2
// Verifies Token and Renders Reset Page
router.get("/reset/:token", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (!user) {
        res.json({
          message: "Password reset token is invalid or has expired.",
        });
        return res.redirect("/forgot");
      }
      res.send("<h1> You can reset your password</h1>");
      // res.render('reset', {user: req.user});
    }
  );
});

// Password Reset Route #3
// Verifies Token and Sets New Password for the account
router.post("/reset/:token", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (!user) {
        res.json({
          message: "Password reset token is invalid or has expired.",
        });
        return res.redirect("/forgot");
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save((err) => {
          res.json({ message: "Password has been reset" });
        });
      });
    }
  );
});

module.exports = router;
