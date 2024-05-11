const express = require("express");

const mongoose = require("mongoose");

//Load user model
require("./models/users");

const passport = require("passport");

const keys = require("./config/keys");

//Passport config
require("./config/passport")(passport);

//Load routes
const auth = require("./routers/auth");

const app = express();

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
