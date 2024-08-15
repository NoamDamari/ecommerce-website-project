const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  // Extract token from header
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
