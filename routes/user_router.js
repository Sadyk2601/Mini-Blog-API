const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middlewares/auth");

router.get("/me", auth, userController.myProfile);

module.exports = router;
