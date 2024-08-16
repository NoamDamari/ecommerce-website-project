const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./database/db");

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to the database
connectToDatabase();

// Import routes
const productsRoutes = require("./routes/productsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

// Define routes
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
