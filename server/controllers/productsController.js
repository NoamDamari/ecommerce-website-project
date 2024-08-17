const axios = require("axios");
const { handleServerError } = require("../utils/errorUtils");

const fetchAllProducts = async (req, res) => {
  try {
    const fields = "id,title,description,brand,category,price,images,rating";
    const url = `https://dummyjson.com/products?limit=200&select=${fields}`;
    const response = await axios.get(url);
    res.json(response.data.products);
  } catch (error) {
    return handleServerError(res, "Failed to fetch products", error);
  }
};

const fetchTechProducts = async (req, res) => {
  try {
    const categories = [
      "smartphones",
      "laptops",
      "tablets",
      "mobile-accessories",
    ];
    const fields = "id,title,description,brand,category,price,images,rating";

    const url = `https://dummyjson.com/products?limit=200&select=${fields}`;
    const response = await axios.get(url);

    const allProducts = response.data.products;
    const filterdProducts = allProducts.filter((product) =>
      categories.includes(product.category)
    );
    res.json(filterdProducts);
  } catch (error) {
    return handleServerError(res, "Failed to fetch products", error);
  }
};

module.exports = { fetchAllProducts, fetchTechProducts };
