const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Get all products
//router.get("/", productsController.fetchAllProducts);

// Get all Tech products
router.get("/", productsController.fetchTechProducts);

module.exports = router;
