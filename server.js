const dotenv = require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const connectDatabase = require("./utils/database");
const { authenticateUser } = require("./middlewares/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");

// Import Blog Routes
const commentRoutes = require("./routes/blogRoutes/commentRoutes");
const blogRoutes = require("./routes/blogRoutes/blogRoutes");

// Import Store Routes
const productRoutes = require("./routes/storeRoutes/productRoutes");
const cartRoutes = require("./routes/storeRoutes/cartRoutes");
const orderRoutes = require("./routes/storeRoutes/orderRoutes");
const reviewRoutes = require("./routes/storeRoutes/reviewRoutes");
const paymentRoutes = require("./routes/storeRoutes/paymentRoutes");

// Create Express app
const app = express();

// Connect to the database
connectDatabase();

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/roles", roleRoutes);

// Blog Routes
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

// Store Routes
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/reviews", reviewRoutes);
app.use("/payments", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
