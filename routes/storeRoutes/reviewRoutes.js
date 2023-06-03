const express = require("express");
const router = express.Router();
const reviewController = require("../../controllers/storeControllers/reviewController");
const { authenticateUser } = require("../../middlewares/authMiddleware");

// GET /api/reviews
router.get("/", reviewController.getAllReviews);

// GET /api/reviews/:id
router.get("/:id", reviewController.getReviewByTitle);

// POST /api/reviews
router.post("/", authenticateUser, reviewController.createReview);

// PUT /api/reviews/:id
router.put("/:id", authenticateUser, reviewController.updateReview);

// DELETE /api/reviews/:id
router.delete("/:id", authenticateUser, reviewController.deleteReview);

module.exports = router;
