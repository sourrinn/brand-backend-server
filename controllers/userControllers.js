const User = require("../models/User");

// Update user address by email
const updateAddress = async (req, res) => {
  const email = req.user.email;
  const { address } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { address },
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user address" });
  }
};

// Update user phone number by email
const updatePhoneNumber = async (req, res) => {
  const email = req.user.email;
  const { phoneNumber } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { phoneNumber },
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user phone number" });
  }
};

// Update user date of birth by email
const updateDateOfBirth = async (req, res) => {
  const email = req.user.email;
  const { dateOfBirth } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { dateOfBirth },
      { new: true }
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user date of birth" });
  }
};

module.exports = { updateAddress, updatePhoneNumber, updateDateOfBirth };
