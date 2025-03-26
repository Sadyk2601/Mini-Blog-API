const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const auth = require("../middlewares/auth");

router
  .post("/register", authController.registerUser)
  .post("/login", authController.login)
  .post("/refresh", auth, authController.resetAccesWithRefresh)
  .post("/logout", auth, authController.logout);

module.exports = router;
