const express = require("express");
const app = express();
const mongana = require("morgan");
let cookieParser = require("cookie-parser");
const errController = require("../controller/errorController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongana("dev"));
app.use(errController);

app.get("*", (req, res, next) => {
  res.send("Port succesfully runnig!!!");
});
module.exports = app;
