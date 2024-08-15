const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = require("./Product");

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [productSchema],
});

// Create the cart model
const Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;
