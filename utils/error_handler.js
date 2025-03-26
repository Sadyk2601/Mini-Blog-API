const resposcha = require("./resposcha.js");

const errorHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      resposcha(res, 404, { error: err.message || "Something went wrong" });
    }
  };
};

module.exports = errorHandler;
