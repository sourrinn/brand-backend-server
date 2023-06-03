const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const {
  authenticateUser,
  authenticateSuperAdmin,
} = require("../middlewares/authMiddleware");

// POST /api/roles/:userId
router.post(
  "/changeUserRole",
  authenticateUser,
  authenticateSuperAdmin,
  roleController.changeUserRole
);

module.exports = router;
