const express = require("express");
const router = express.Router();
const axios = require("axios");
const cartController = require('../controllers/cartController')

// Add a product to the cart or update its quantity if it already exists
router.post("/add", cartController.addToCart);

// Delete a product from the cart
router.delete("/delete/:userId/:itemId", cartController.removeFromCart);

// Get all items in the user's cart
router.get("/cart/:id", cartController.getCartItems);

module.exports = router;
