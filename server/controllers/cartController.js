const { handleServerError } = require("../utils/errorUtils");
const { findUserCart } = require("../services/cartService");
const Cart = require("../models/Cart");

// Get all items in the user's cart
const getCartItems = async (req, res) => {
  const userId = req.params.id;

  try {
    const userCart = await findUserCart(userId);

    const userCartItems = userCart.items || [];

    // Return the user's cart items in the response
    return res.status(200).json(userCartItems);
  } catch (error) {
    return handleServerError(res, "Failed to get user cart items", error);
  }
};

// Add a product to the cart or update its quantity if it already exists
const addToCart = async (req, res) => {
  const userId = req.body.userId;
  const product = req.body.product;

  if (product.quantity === undefined || product.quantity === null) {
    return res
      .status(400)
      .json({ error: "Quantity is required for the product" });
  }

  try {
    const userCart = await findUserCart(userId);

    // Check if the product is already in the cart
    const cartItem = userCart.items.find((item) => item.id === product.id);

    if (cartItem) {
      cartItem.quantity = product.quantity;
    } else {
      // If the product does not exist, create a new product
      userCart.items.push(product);
    }

    await userCart.save();
    return res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    return handleServerError(res, "Failed to add product to cart", error);
  }
};

// Delete a product from the cart
const removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;

  try {
    const userCart = await findUserCart(userId);

    // Filter out the item with the specified itemId from the user's cart
    userCart.items = userCart.items.filter(
      (item) => item.id !== parseInt(itemId)
    );

    await userCart.save();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return handleServerError(res, "Failed to remove product from cart", error);
  }
};

const clearCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find the user's cart and clear its items
    const userCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    return handleServerError(res, "Failed to clear cart", error);
  }
};

// Update a single product's quantity in the cart
const updateCartItemQuantity = async (req, res) => {
  const { userId, item, newQuantity } = req.body;

  try {
    const userCart = await findUserCart(userId);

    // Find the product in the cart and update its quantity
    const cartItem = userCart.items.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
      cartItem.quantity = newQuantity;
      await userCart.save();
      return res.status(200).json(userCart);
    } else {
      return res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    return handleServerError(res, "Failed to update item in cart", error);
  }
};

// Update products quantity in the cart
const updateMultipleCartItemsQuantity = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    const userCart = await findUserCart(userId);

    // Update each item in the cart
    items.forEach((item) => {
      const { id, quantity } = item;

      const cartItem = userCart.items.find((cartItem) => cartItem.id === id);

      if (cartItem) {
        cartItem.quantity = quantity;
      }
    });

    await userCart.save();
    res.status(200).json({ message: "Cart items updated successfully" });
  } catch (error) {
    return handleServerError(res, "Error updating cart", error);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  updateMultipleCartItemsQuantity,
  getCartItems,
};
