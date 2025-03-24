require("dotenv").config();
const express = require("express");
const app = express();
const mongana = require("morgan");
let cookieParser = require("cookie-parser");

const connectDb = require("./config/db.js");
const errController = require("./controller/errorController.js");
connectDb();

app.use(express.json());
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
