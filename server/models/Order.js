const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = require("./Product");

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [productSchema],
  date: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  itemsQuantity: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
