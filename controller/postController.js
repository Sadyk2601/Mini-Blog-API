const Post = require("../models/post_model");
const errorHandler = require("../utils/error_handler");
const resposcha = require("../utils/resposcha");

let findAllPosts = errorHandler(async (req, res, next) => {
  let posts = await Post.find().populate("author");
  resposcha(res, 200, { name: "Posts", posts });
});

let addPost = errorHandler(async (req, res, next) => {
  let data = req.body;
  let post = await Post.create({ ...data });
  resposcha(res, 200, { name: "Post", post });
});

let findPostById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  let post = await Post.findById(id).populate("author");
  if (post) {
    resposcha(res, 200, { name: "Post", post });
  } else {
    resposcha(res, 404, { error: "No information !!!" });
  }
});

let updatePostById = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  let post = await Post.findByIdAndUpdate(id, data, { new: true });
  resposcha(res, 200, { name: "Post", post });
});

let deletePost = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  await Post.findByIdAndDelete(id);
  resposcha(res, 204);
});

module.exports = {
  findAllPosts,
  addPost,
  deletePost,
  findPostById,
  updatePostById,
};
