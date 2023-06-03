const Comment = require("../../models/blogModels/Comment");

// Get all comments for a blog
async function getAllComments(req, res) {
  try {
    const comments = await Comment.find({ blogTitle: req.params.blogTitle });
    res.json(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller method to get a comment by blog title and user's email
const getCommentByBlogTitleAndEmail = async (req, res) => {
  try {
    const { blogTitle, email } = req.params;
    const comment = await Comment.findOne({ blogTitle, email });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new comment
async function createComment(req, res) {
  try {
    const { blogTitle, email, content } = req.body;
    const userId = req.user.id; // Access authenticated user's ID from the JWT token

    const existingComment = await Comment.findOne({
      blogTitle,
      email,
    });

    if (existingComment) {
      res.status(201).json({ message: "Comment already does exists." });
    }

    const newComment = new Comment({
      blogTitle,
      email,
      content,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Update a comment
async function updateComment(req, res) {
  const { blogTitle, email } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.findOneAndUpdate(
      { blogTitle, email },
      { content },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// Delete a comment
async function deleteComment(req, res) {
  const { blogTitle } = req.params;
  const email = req.user.email;
  try {
    const comment = await Comment.findOneAndDelete({
      blogTitle,
      email,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAllComments,
  getCommentByBlogTitleAndEmail,
  createComment,
  updateComment,
  deleteComment,
};
