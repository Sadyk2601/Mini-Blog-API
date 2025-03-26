const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error_handler");
const resposcha = require("../utils/resposcha");
const User = require("../models/user_model");

let auth = errorHandler(async function (req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return resposcha(res, 401, json({ error: "Token error !!!" }));
  }
  let token = req.headers.authorization.split(" ")[1];
  if (!token) return resposcha(res, 404, json({ error: "Token uncatched" }));
  let checking = await jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
  let user = await User.findById(checking.id).select("username age email name");

  if (!user) {
    return resposcha(res, 404, json({ error: "User not found" }));
  }
  req.user = user;
  next();
});
module.exports = auth;
