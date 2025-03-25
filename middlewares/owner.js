const Post = require("../models/post_model");
const errorHandler = require("../utils/error_handler");
const resposcha = require("../utils/resposcha");

module.exports = errorHandler(async function (req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return resposcha(res, 404, { message: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return resposcha(res, 403, { message: "Access denied, not the owner" });
    }
    next();
  } catch (error) {
    resposcha(res, 500, { message: error.message });
  }
});
