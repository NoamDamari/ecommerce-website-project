const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createNewUser } = require("../services/userService");
const { handleServerError } = require("../utils/errorUtils");
const { createToken, saltRounds } = require("../utils/authUtils");

// Controller function to handle user registration
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createNewUser(username, email, hashedPassword);

    // Generate a JWT token for the registered user
    const token = createToken(newUser._id);

    res.status(200).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        cart: newUser.cart,
      },
      token: token,
    });
  } catch (error) {
    return handleServerError(res, "Error registering user", error);
  }
};

// Controller function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token for the logged-in user
    const token = createToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        cart: user.cart,
      },
      token: token,
    });
  } catch (error) {
    return handleServerError(res, "Error logging in user", error);
  }
};

module.exports = { register, login };
