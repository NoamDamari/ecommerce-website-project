const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticateToken = require("../middlewares/authMiddleware");

// Add a product to the cart or update if it already exists
router.post("/add", authenticateToken, cartController.addToCart);

// Delete a product from the cart
router.delete(
  "/delete/:userId/:itemId",
  authenticateToken,
  cartController.removeFromCart
);

router.delete(
  "/clear/:userId",
  authenticateToken,
  cartController.clearCart
);
// Update single item
router.patch("/update" , authenticateToken , cartController.updateCartItemQuantity)

// Update Multiple items
router.patch("/update-items" , authenticateToken , cartController.updateMultipleCartItemsQuantity)

// Get all items in the user's cart
router.get("/cart/:id", authenticateToken, cartController.getCartItems);

module.exports = router;
