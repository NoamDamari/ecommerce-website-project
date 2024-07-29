const express = require("express");
const router = express.Router();
const axios = require("axios");
const { fetchAllProducts } = require("../controllers/productsController");

// Get all products list
router.get("/", fetchAllProducts);

module.exports = router;
