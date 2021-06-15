// Imports
const router = require("express").Router();
const likeController = require("../controllers/like.controller");
const { checkUser, requireAuth } = require("../middleware/auth.middleware");

// routes
router.patch(
  "/:id/like-post/:liker",
  checkUser,
  requireAuth,
  likeController.likePost
);
router.delete(
  "/:id/unlike-post/:liker",
  checkUser,
  requireAuth,
  likeController.deleteLike
);
router.get("/read-like-post", likeController.readLikePost);

// exports
module.exports = router;
