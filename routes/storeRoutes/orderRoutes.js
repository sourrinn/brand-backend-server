const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/storeControllers/orderController");
const {
  authenticateUser,
  authenticateManager,
} = require("../../middlewares/authMiddleware");

// GET /api/orders/:email
router.get("/:email", authenticateUser, orderController.getOrdersByUserEmail);

// POST /api/orders/create
router.post("/create", authenticateUser, orderController.createOrder);

// PUT /api/orders/:id/update
router.put(
  "/:id/update",
  authenticateUser,
  authenticateManager,
  orderController.updateOrderStatus
);

module.exports = router;
