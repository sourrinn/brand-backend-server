const express = require("express");
const {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
} = require("../../controllers/storeControllers/paymentController");
const { authenticateUser } = require("../../middlewares/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/payments
 * @description Create a new payment
 * @access Public
 */
router.post("/", authenticateUser, createPayment);

/**
 * @route GET /api/payments/:transactionId
 * @description Get payment by transaction ID
 * @param {string} transactionId - The ID of the payment transaction
 * @access Transaction Id
 */
router.get("/:transactionId", authenticateUser, getPaymentById);

/**
 * @route PUT /api/payments/:transactionId/status
 * @description Update payment status
 * @param {string} transactionId - The ID of the payment transaction
 * @access Public
 */
router.put("/:transactionId/status", authenticateUser, updatePaymentStatus);

module.exports = router;
