const express = require("express");
const router = express.Router();
const axios = require("axios");

const Products = require("../models/Product");

// Add a product to the cart or update its quantity if it already exists
router.post("/add", async (req, res) => {
  const {
    id,
    title,
    description,
    category,
    brand,
    price,
    rating,
    images,
    quantity,
  } = req.body;

  try {
    // Check if the product already exists 
    const productInCart = await Products.findOne({ id: id });

    if (productInCart) {
      // If the product exists, update its quantity
      productInCart.quantity += quantity;
      await productInCart.save();
      return res.status(200).json(productInCart);
    } else {
       // If the product does not exist, create a new product
      const newProduct = await Products.create({
        id,
        title,
        description,
        category,
        brand,
        price,
        rating,
        images,
        quantity,
      });

      return res.status(201).json(newProduct);
    }
  } catch (error) {
    console.error("Failed to add product:", error);
    return res.status(500).json({ error: "Failed to add product" });
  }
});

// Delete a product from the cart
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
     // Attempt to delete the product from the database
    const deletedProduct = await Products.deleteOne({ id: id });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
