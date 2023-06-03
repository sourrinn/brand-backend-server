const mongoose = require("mongoose");

// Define the Blog schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  audioUrl: {
    type: [String],
  },
  videoUrl: {
    type: [String],
  },
  tags: {
    type: [String],
    required: true,
    default: ["all"],
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: [
      {
        contentType: {
          type: String,
          enum: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
          required: true,
          default: "p",
        },
        contentDesc: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  author: {
    type: String,
    default: "Team Xperience",
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
