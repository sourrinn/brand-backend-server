const User = require("../models/User");

// POST /api/roles/:userId
const changeUserRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    // Update the role of the target user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the updated user object in the response
    res.json(updatedUser);
  } catch (error) {
    console.error("Error changing user role:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  changeUserRole,
};
