const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get single product
router.get("/", async (req, res) => {
  try {
    const fields = "id,title,description,brand,category,price,images,rating";
    const url = `https://dummyjson.com/products?limit=200&select=${fields}`;
    const response = await axios.get(url);
    res.json(response.data.products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
