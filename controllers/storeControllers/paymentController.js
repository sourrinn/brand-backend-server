const Payment = require("../../models/storeModels/Payment");

/**
 * Create a new payment
 * @route POST /api/payments
 * @access Public
 */
const createPayment = async (req, res) => {
  try {
    // Extract required data from request body and request
    const userEmail = req.user.email;
    const { order, amount, paymentMethod, transactionId } = req.body;

    // Create a new payment
    const payment = await Payment.create({
      userEmail,
      order,
      amount,
      paymentMethod,
      transactionId,
    });

    // Return the created payment as the response
    res.status(201).json(payment);
  } catch (error) {
    // Handle any errors that occur during payment creation
    res.status(500).json({ error: "Failed to create payment" });
  }
};

/**
 * Get payment by ID
 * @route GET /api/payments/:transactionId
 * @description Get payment by transaction ID
 * @param {string} transactionId - The ID of the payment
 * @access Transaction Id
 */
const getPaymentById = async (req, res) => {
  try {
    // Extract payment ID from request parameters
    const { transactionId } = req.params;

    // Find the payment by its ID
    const payment = await Payment.findById(transactionId);

    // Check if payment exists
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Return the payment as the response
    res.json(payment);
  } catch (error) {
    // Handle any errors that occur during payment retrieval
    res.status(500).json({ error: "Failed to retrieve payment" });
  }
};

/**
 * Update payment status
 * @route PUT /api/payments/:transactionId/status
 * @param {string} transactionId - The ID of the payment
 * @access Public
 */
const updatePaymentStatus = async (req, res) => {
  try {
    // Extract payment ID and status from request parameters and body
    const { transactionId } = req.params;
    const { status } = req.body;

    // Find the payment by its ID and update the status
    const payment = await Payment.findByIdAndUpdate(
      transactionId,
      { status },
      { new: true }
    );

    // Check if payment exists
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Return the updated payment as the response
    res.json(payment);
  } catch (error) {
    // Handle any errors that occur during payment status update
    res.status(500).json({ error: "Failed to update payment status" });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
};
