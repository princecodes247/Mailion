const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { Harpert } = require("../utils/harpert");
let User = new Harpert("users", "user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (email, password, done) => {
        // Match user
        User.findOne({email})
          .then((user) => {
            console.log(`${user} line 14 passport.js`);
            if (!user || user == null) {
              console.log("nono");
              return done(null, false, { message: "No such registered user" });
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch(err=>console.log(`${err} line 30 passport.js`))
      }
    )
  );

  passport.serializeUser(function (user, done) {
    if (typeof user === "string") {
      user = JSON.parse(user)
    }
    console.log(`${user} inside serialize`);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
