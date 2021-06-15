// Imports
const router = require("express").Router();
const commentController = require("../controllers/comment.controllers");
const { checkUser, requireAuth } = require("../middleware/auth.middleware");

// routes
router.patch(
  "/:id/comment-post/:userId",
  checkUser,
  requireAuth,
  commentController.commentPost
);
router.get("/read-comment-post", commentController.readCommentPost);
router.patch(
  "/comment-post/:id",
  checkUser,
  requireAuth,
  commentController.updatePost
);
router.delete(
  "/:postId/delete-comment-post/:id",
  checkUser,
  requireAuth,
  commentController.deleteCommentPost
);

// exports
module.exports = router;
