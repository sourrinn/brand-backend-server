const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { json } = require("body-parser");

async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_Secret_Key,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get logged in user data
const loggedIn = async (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_Secret_Key);
    const userData = await User.findById(decoded.id);
    res.status(200).json({ userData });

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

// Logout
const logout = (req, res) => {
  // Clear the JWT token from the client-side
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

module.exports = {
  register,
  login,
  loggedIn,
  logout,
};
