const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error_handler");
const resposcha = require("../utils/resposcha");

module.exports = errorHandler(async function (req, res, next) {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
      return resposcha(res, 401, { message: "You need authorization !!!" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user)
      return resposcha(res, 401, { message: "User not found !!!" });

    next();
  } catch (error) {
    resposcha(res, 401, { message: "Authorization mistake !!!" });
  }
});
