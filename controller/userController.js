const User = require("../models/user_model");
const errorHandler = require("../utils/error_handler");
const resposcha = require("../utils/resposcha");

const myProfile = errorHandler(function (req, res, next) {
  try {
    let user = req.user;
    console.log(user);

    resposcha(res, 200, { user });
  } catch (error) {
    resposcha(res, 500, { message: "Error server !!!" });
  }
});

module.exports = { myProfile };
