const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const mongoUrl = `mongodb+srv://${dbUser}:${dbPassword}@aws-mumbai-m0-cluster.vv4yqxe.mongodb.net/?retryWrites=true&w=majority`;

// Connect to the MongoDB database
const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

// Export the database connection
module.exports = connectDatabase;
