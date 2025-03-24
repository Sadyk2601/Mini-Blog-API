const express = require("express");
const app = express();
const mongana = require("morgan");
let cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongana("dev"));

app.use(errController);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥");
  console.log(err.name, err.message);
});

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED Excpections 💥");
  console.log(err.name, err.message);
});

app.get("*", (req, res, next) => {
  res.send("Port succesfully runnig!!!");
});

const errController = require("./controller/errorController.js");
