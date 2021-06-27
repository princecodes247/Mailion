const bodyParser = require("body-parser");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors")
const app = express();
const User = require("./models/user");

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Fix Session Warning
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// Connect flash for flash sessions
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// For Static files
app.use(express.static("public"));

// app.use("/", require("./routes/common.js"));
// app.use("/", require("./routes/users.js"));
// app.use("/warp", require("./routes/warps.js"));
// app.use("/sss", require("./routes/messages.js"));
//REMEBER TO ADD 404 PAGE
// app.use("/*", (req, res) => {
//   res.redirect("/404");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening at ${PORT}`));
