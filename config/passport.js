const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
let User = new Harpert("users", "user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (username, password, done) => {
        // Match user
        User.find("username", username)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        }).then((user) => {
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
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
