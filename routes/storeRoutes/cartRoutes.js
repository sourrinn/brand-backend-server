const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/storeControllers/cartController");

// GET /api/cart/:email
router.get("/:email", cartController.getCartByUserEmail);

// POST /api/cart/add
router.post("/add", cartController.addItemToCart);

// PUT /api/cart/update
router.put("/update", cartController.updateCartItemQuantity);

// DELETE /api/cart/remove
router.delete("/remove", cartController.removeItemFromCart);

module.exports = router;
