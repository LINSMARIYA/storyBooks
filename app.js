const express = require("express");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");

//Load user model
require("./models/users");

const passport = require("passport");

const keys = require("./config/keys");

//Passport config
require("./config/passport")(passport);

//Load routes
const auth = require("./routers/auth");
const cookieParser = require("cookie-parser");

const app = express();

// Use the session middleware
app.use(cookieParser());
app.use(
  session({
    secret: "secrets",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

//Load routes
app.use("/auth", auth);

app.listen(port, () => {
  console.log("Server listening on port ", port);
});

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("It works");
});

app.get("/dashboard", (req, res) => {
  res.send("DASHBOARD");
});
