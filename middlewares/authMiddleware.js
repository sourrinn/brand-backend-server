const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_Secret_Key);

    // Fetch user data from database
    userData = await User.findById(decoded.id);

    // Attach the decoded user object to the request
    req.user = await userData;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

// Middleware for checking super-admin privileges
const authenticateSuperAdmin = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (req.user && req.user.role === "superadmin") {
    // User is admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not admin, send an error response
    res.status(403).json({ error: "Unauthorized access" });
  }
};

// Middleware for checking admin privileges
const authenticateAdmin = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (
    (req.user && req.user.role === "admin") ||
    req.user.role === "superadmin"
  ) {
    // User is admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not admin, send an error response
    res.status(403).json({ error: "Unauthorized access" });
  }
};

// Middleware for checking manager privileges
const authenticateManager = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (
    req.user &&
    (req.user.role === "manager" ||
      req.user.role === "admin" ||
      req.user.role === "superadmin")
  ) {
    // User is admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not admin, send an error response
    res.status(403).json({ error: "Unauthorized access" });
  }
};

// Middleware for checking post editor privileges
const authenticateEditor = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (
    req.user &&
    (req.user.role === "editor" ||
      req.user.role === "manager" ||
      req.user.role === "admin" ||
      req.user.role === "superadmin")
  ) {
    // User is admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not admin, send an error response
    res.status(403).json({ error: "Unauthorized access!" });
  }
};
// Middleware for checking assistant editor privileges
const authenticateAssistantEditor = (req, res, next) => {
  // Check if user is authenticated and has admin role
  if (
    req.user &&
    (req.user.role === "assistanteditor" ||
      req.user.role === "editor" ||
      req.user.role === "manager" ||
      req.user.role === "admin" ||
      req.user.role === "superadmin")
  ) {
    // User is admin, proceed to the next middleware or route handler
    next();
  } else {
    console.log(req.user);
    // User is not admin, send an error response
    res.status(403).json({ error: "Unauthorized access!" });
  }
};

module.exports = {
  authenticateUser,
  authenticateSuperAdmin,
  authenticateAdmin,
  authenticateManager,
  authenticateEditor,
  authenticateAssistantEditor,
};
