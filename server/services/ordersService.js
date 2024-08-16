const User = require("../models/User");
const Order = require("../models/Order");

const findUserOrders = async (userId) => {
  try {
    // Find the user by userId and populate the orders
    const user = await User.findById(userId).populate("orders");

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.orders) {
      throw new Error("Orders not found for the user");
    }

    return user.orders;
  } catch (error) {
    throw error;
  }
};

const saveNewOrder = async (userId, orderData) => {
  try {
    // Create a new order
    const newOrder = new Order({
      userId: userId, 
      items: orderData.items,
      date: new Date(),
      totalPrice: orderData.totalPrice,
      itemsQuantity: orderData.itemsQuantity,
    });

    await newOrder.save();

    // Find the user and save the new order to the user's orders
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.orders.push(newOrder._id);
    await user.save();

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserOrders,
  saveNewOrder,
};
