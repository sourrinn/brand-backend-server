// Import the necessary modules and models
const Blog = require("../../models/blogModels/Blog");

// Controller method to get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;

    // Calculate the skip value based on the current page and limit
    const skip = (page - 1) * limit;

    // Query the database to get paginated blogs
    const blogs = await Blog.find().skip(skip).limit(limit).exec();

    // Get the total count of blogs for pagination metadata
    const totalCount = await Blog.countDocuments().exec();

    res.json({
      status: "success",
      data: blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Controller method to get a blog by title
const getBlogByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const blog = await Blog.findOne({ title });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method to get blogs by category
const getBlogsByCategory = async (req, res) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const query = Blog.find({ category })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const blogs = await query.exec();

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving blogs" });
  }
};

// Controller method to get blogs by tags
const getBlogsByTags = async (req, res) => {
  const { tags } = req.params;
  const { page, limit } = req.query;

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const query = Blog.find({ tags: { $in: tags } })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const blogs = await query.exec();

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving blogs" });
  }
};

// Controller method to create a new blog
const createBlog = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      tags,
      category,
      content,
      author,
      published,
      audioUrl,
      videoUrl,
    } = req.body;

    // to check if the blog title already exists
    const doesExist = await Blog.findOne({ title });
    if (doesExist) {
      res.status(400).json({ error: "Blog Title already exists" });
    }

    const newBlog = new Blog({
      title,
      imageUrl,
      tags,
      category,
      content,
      author,
      published,
      audioUrl,
      videoUrl,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method to update a blog by title
const updateBlogByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const { tags, category, content, author, published } = req.body;
    const updatedBlog = await Blog.findOneAndUpdate(
      { title },
      { tags, category, content, author, published },
      { new: true }
    );
    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller method to delete a blog by title
const deleteBlogByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const deletedBlog = await Blog.findOneAndDelete({ title });
    if (deletedBlog) {
      res.json({ message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Export the controller methods
module.exports = {
  getAllBlogs,
  getBlogByTitle,
  getBlogsByCategory,
  getBlogsByTags,
  createBlog,
  updateBlogByTitle,
  deleteBlogByTitle,
};
