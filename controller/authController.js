const User = require("../models/user_model");
const errorHandler = require("../utils/error_handler");
const resposcha = require("../utils/resposcha");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

let registerUser = errorHandler(async (req, res, next) => {
  let { email, username, age, password, name } = req.body;
  if (!email || !username || !age || !password || !name) {
    throw new Error("Fill all requied inputs !!!");
  }

  let [existUser, existUserEmail] = await Promise.all([
    User.find({ username: username }),
    User.find({ email: email }),
  ]);
  if (existUser.length || existUserEmail.length) {
    throw new Error(`${existUser.length ? "username" : "email"} is exists !!!`);
  }

  let user = await User.create({ email, username, age, password, name });
  resposcha(res, 200, {
    message: "Authorization succesfully passed !!!",
    user,
  });
});

let login = errorHandler(async (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) throw new Error("All data required !!!");
  let user = await User.findOne({ username })
    .select("password email name ")
    .exec();
  if (!user) throw new Error("User dont exists in database !!!");

  let checking = await bcrypt.compare(password, user.password);
  if (!checking) throw new Error("Wrong password !!!");
  user.password = password;
  let token = await jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_EXP_TIME }
  );
  console.log(token);

  let refreshToken = await jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: eval(process.env.JWT_REFRESH_EXP_TIME) }
  );
  user.refreshToken = refreshToken;
  await user.save();

  let options = {
    maxAge: eval(process.env.JWT_REFRESH_EXP_TIME),
    httpOnly: false,
  };

  res.cookie("jwt", refreshToken, options);
  let userObj = user.toObject();

  delete userObj.password;
  delete userObj.refreshToken;

  resposcha(res, 200, { userObj, token });
});

let resetAccesWithRefresh = errorHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  let checking = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
  let user = await User.findOne({ refreshToken: token });
  if (!user || user.id !== checking.id) {
    throw new Error("User not found !!!");
  }

  let accesToken = await jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_EXP_TIME }
  );
  resposcha(res, 200, { token: accesToken });
});

const logout = errorHandler(async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: false });
    await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    resposcha(res, 200, { message: "You succesfully logout !!!" });
  } catch (error) {
    resposcha(res, 500, { message: "Server error !!!", error });
  }
});

module.exports = {
  registerUser,
  login,
  resetAccesWithRefresh,
  logout,
};
