const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blogControllers/blogController");
const {
  authenticateEditor,
  authenticateAssistantEditor,
  authenticateUser,
} = require("../../middlewares/authMiddleware");

// GET /blogs
router.get("/", blogController.getAllBlogs);

// GET /blogs/:title
router.get("/:title", blogController.getBlogByTitle);

// GET /api/blogs/category/:category
router.get("/category/:category", blogController.getBlogsByCategory);

// GET /api/blogs/tags/:tags
router.get("/tags/:tags", blogController.getBlogsByTags);

// POST /blogs
router.post(
  "/",
  authenticateUser,
  authenticateAssistantEditor,
  blogController.createBlog
);

// PUT /blogs/:title
router.put(
  "/:title",
  authenticateUser,
  authenticateAssistantEditor,
  blogController.updateBlogByTitle
);

// DELETE /blogs/:title
router.delete("/:title", authenticateEditor, blogController.deleteBlogByTitle);

module.exports = router;
