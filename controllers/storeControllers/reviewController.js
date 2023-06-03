const Review = require("../../models/storeModels/Review");

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get review by title
const getReviewByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const review = await Review.findOne({ productTitle: title });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new review
const createReview = async (req, res) => {
  const { userEmail, productTitle, rating, title, description } = req.body;
  try {
    const review = new Review({
      userEmail,
      productTitle,
      rating,
      title,
      description,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const title = req.params.title;
  const { userEmail, rating, title: newTitle, description } = req.body;
  try {
    const review = await Review.findOneAndUpdate(
      { productTitle: title },
      { userEmail, rating, title: newTitle, description },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const title = req.params.title;
  try {
    const review = await Review.findOneAndDelete({ productTitle: title });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllReviews,
  getReviewByTitle,
  createReview,
  updateReview,
  deleteReview,
};
