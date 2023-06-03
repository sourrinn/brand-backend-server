const express = require("express");
const authController = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateUser, authController.loggedIn);
router.post("/logout", authenticateUser, authController.logout);

module.exports = router;
