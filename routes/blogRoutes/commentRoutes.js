const express = require("express");
const commentController = require("../../controllers/blogControllers/commentController");
const { authenticateUser } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/blog/:blogTitle", commentController.getAllComments);
router.get(
  "/:blogTitle/:email",
  commentController.getCommentByBlogTitleAndEmail
);
router.post(
  "/blog/:blogTitle",
  authenticateUser,
  commentController.createComment
);
router.put(
  "/blog/:blogTitle/email/:email",
  authenticateUser,
  commentController.updateComment
);
router.delete(
  "/blogTitle/:blogTitle",
  authenticateUser,
  commentController.deleteComment
);

module.exports = router;
