const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

// Create a JWT token for a given user ID
const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { createToken, saltRounds };
