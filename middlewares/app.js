const express = require("express");
const app = express();
const mongana = require("morgan");
let cookieParser = require("cookie-parser");
const errController = require("../controller/errorController");
const postRouter = require("../routes/post_router");
const authRouter = require("../routes/auth_router");
const userRouter = require("../routes/user_router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(mongana("dev"));
app.use(errController);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥");
  console.log(err.name, err.message);
});

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED Excpections 💥");
  console.log(err.name, err.message);
});

app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("*", (req, res, next) => {
  res.send("Port succesfully runnig!!!");
});
module.exports = app;
