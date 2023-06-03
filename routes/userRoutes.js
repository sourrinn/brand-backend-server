const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { authenticateUser } = require("../middlewares/authMiddleware");

// PUT /api/users/address
router.put("/address/:address", authenticateUser, userController.updateAddress);

// PUT /api/users/phone
router.put("/phone/:phone", authenticateUser, userController.updatePhoneNumber);

// PUT /api/users/date-of-birth
router.put(
  "/dateOfBirth/:dateOfBirth",
  authenticateUser,
  userController.updateDateOfBirth
);

module.exports = router;
