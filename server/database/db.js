require("dotenv").config();
const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

module.exports = connectToDatabase;
