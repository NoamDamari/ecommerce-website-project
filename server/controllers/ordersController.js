const { findUserOrders, saveNewOrder } = require("../services/ordersService");
const { handleServerError } = require("../utils/errorUtils");

const getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userOrders = await findUserOrders(userId);
    if (!userOrders) {
      return res.status(400).json({ error: "" });
    }

    // Return the user's orders in the response
    return res.status(200).json(userOrders);
  } catch (error) {
    return handleServerError(res, "Failed to get user orders", error);
  }
};

const addOrder = async (req, res) => {
  const userId = req.body.userId;
  const orderData = req.body.orderData;

  if (!userId || !orderData) {
    return res
      .status(400)
      .json({ message: "User ID and order data are required" });
  }

  try {
    const success = await saveNewOrder(userId, orderData);
    if (success) {
      return res.status(200).json({ message: "Order added successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add order" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to add order", error });
  }
};

module.exports = { getUserOrders, addOrder };
