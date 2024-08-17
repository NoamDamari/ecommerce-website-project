const User = require("../models/User");
const Cart = require("../models/Cart");

const createNewUser = async (username, email, hashedPassword) => {
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    cart: null,
  });
  await newUser.save();

  // Create a new cart and link it to the user
  const newCart = new Cart({
    user: newUser._id,
    products: [],
  });
  await newCart.save();

  // Update the user with the correct cart reference
  newUser.cart = newCart._id;
  await newUser.save();

  return newUser;
};

module.exports = { createNewUser };
