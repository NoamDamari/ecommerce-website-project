const User = require("../models/User");

// Add a product to the cart or update its quantity if it already exists
const addToCart = async (req, res) => {
  const userId = req.body.userId;
  const productData = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    rating: req.body.rating,
    images: req.body.images,
    quantity: req.body.quantity,
  };

  try {
    // Check if the user exists
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is already in the cart
    const cartItem = user.cart.find((item) => item.id === productData.id);

    if (cartItem) {
      // If the product exists, update its quantity
      cartItem.quantity += productData.quantity;
    } else {
      // If the product does not exist, create a new product
      user.cart.push(productData);
    }

    await user.save();
    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    return res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Delete a product from the cart
const removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;

  try {
    // Check if the user exists
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out the item with the specified itemId from the user's cart
    user.cart = user.cart.filter((item) => item.id !== parseInt(itemId));

    await user.save();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Failed to remove product from cart:", error);
    return res
      .status(500)
      .json({ error: "Failed to remove product from cart" });
  }
};

// Get all items in the user's cart
const getCartItems = async (req, res) => {
  // Check if the user exists
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Return the user's cart items in the response
    return res.status(200).json(user.cart);
  } catch (error) {
    console.error("Failed to get user cart items:", error);
    return res.status(500).json({ error: "Failed to get user cart items" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
};
