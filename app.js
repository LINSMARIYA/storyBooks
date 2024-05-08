const express = require("express");

const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server listening on port ", port);
});

//DB config
const db = require("./config/database");

mongoose
  .connect(db.mongoURI)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));
