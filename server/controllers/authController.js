const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require("dotenv").config();

const saltRounds = 10;

// Create a JWT token for a given user ID
const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// Controller function to handle user registration
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

     // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password , saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token for the registered user
    const token = createToken(newUser._id);

    res.status(200).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        cart: newUser.cart,
        purchasedProducts: newUser.purchasedProducts,
      },
      token: token
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
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
        purchasedProducts: user.purchasedProducts,
      },
      token: token
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
