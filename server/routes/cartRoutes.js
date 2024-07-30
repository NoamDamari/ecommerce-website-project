const express = require("express");
const router = express.Router();
const axios = require("axios");
const cartController = require("../controllers/cartController");
const authenticateToken = require("../middlewares/authMiddleware");

// Add a product to the cart or update its quantity if it already exists
router.post("/add", authenticateToken, cartController.addToCart);

// Delete a product from the cart
router.delete(
  "/delete/:userId/:itemId",
  authenticateToken,
  cartController.removeFromCart
);

// Get all items in the user's cart
router.get("/cart/:id", authenticateToken, cartController.getCartItems);

module.exports = router;
