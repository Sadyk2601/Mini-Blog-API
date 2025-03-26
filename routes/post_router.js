const express = require("express");
const router = express.Router();
const multer = require("multer");
let postRouter = require("../controller/postController");
let path = require("path");
const auth = require("../middlewares/auth");
const owner = require("../middlewares/owner");

let storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 },
  fileFilter: (req, file, cb) => {
    let extraname = path.extname(file.originalname);
    if ([".jpg", ".png"].includes(extraname)) {
      cb(null, true);
    } else {
      cb(new Error("It is wrong type!!!"));
    }
  },
});
router
  .get("/", postRouter.findAllPosts)
  .get("/:id", postRouter.findPostById)
  .post("/", auth, upload.single("image"), postRouter.addPost)
  .put("/:id", auth, owner, postRouter.updatePostById)
  .delete("/:id", auth, owner, postRouter.deletePost);

module.exports = router;
