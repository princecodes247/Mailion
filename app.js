const bodyParser = require("body-parser");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
dotenv.config();
const flash = require("connect-flash");
const session = require("cookie-session");

const passport = require("passport");
const cors = require("cors")
const app = express();

// Passport Config
require("./config/passport")(passport);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set('layout', 'layouts/layout');
app.set("layout extractStyles", true);

// Express body parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Fix Session Warning

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Connect flash for flash sessions
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// For Static files
app.use(express.static("public"));

app.use("/", require("./routes/common.js"));
app.use("/", require("./routes/users.js"));
app.use("/collections", require("./routes/collections.js"));
// app.use("/sss", require("./routes/messages.js"));
//REMEBER TO ADD 404 PAGE
// app.use("/*", (req, res) => {
//   res.redirect("/404");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening at ${PORT}`));
