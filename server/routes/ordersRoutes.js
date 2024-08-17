const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const ordersController = require("../controllers/ordersController");

// Get user's orders data
router.get("/:userId", authenticateToken, ordersController.getUserOrders);

// Add order
router.post("/addOrder", authenticateToken, ordersController.addOrder);

module.exports = router;
