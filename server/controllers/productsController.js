const axios = require("axios");

const fetchAllProducts = async (req, res) => {
    try {
        const fields = "id,title,description,brand,category,price,images,rating";
        const url = `https://dummyjson.com/products?limit=200&select=${fields}`;
        const response = await axios.get(url);
        res.json(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
}

module.exports = {fetchAllProducts}