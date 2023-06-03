const express = require("express");
const router = express.Router();
const productController = require("../../controllers/storeControllers/productController");
const {
  authenticateUser,
  authenticateManager,
} = require("../../middlewares/authMiddleware");

// GET /api/products
router.get("/", productController.getAllProducts);

// GET /api/products/:id
router.get("/:title", productController.getProductByTitle);

// POST /api/products
router.post(
  "/",
  authenticateUser,
  authenticateManager,
  productController.createProduct
);

// PUT /api/products/:id
router.put(
  "/:title",
  authenticateUser,
  authenticateManager,
  productController.updateProduct
);

// DELETE /api/products/:id
router.delete(
  "/:title",
  authenticateUser,
  authenticateManager,
  productController.deleteProduct
);

module.exports = router;
