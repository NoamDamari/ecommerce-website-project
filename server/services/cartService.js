const User = require("../models/User");

const findUserCart = async (userId) => {
  try {
    // Find the user by userId and populate the cart
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.cart) {
      throw new Error("Cart not found for the user");
    }

    return user.cart;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserCart,
};
