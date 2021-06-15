// Imports
const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();
const { checkUser, requireAuth } = require("../middleware/auth.middleware");

// routes
router.get("/", postController.readPost);
router.get("/read-one-post/:id", postController.readOnePost);
router.post(
  "/",
  upload.single("file"),
  checkUser,
  requireAuth,
  postController.createPost
);
router.put("/:id", checkUser, requireAuth, postController.updatePost);
router.delete("/:id", checkUser, requireAuth, postController.deletePost);

// exports
module.exports = router;
