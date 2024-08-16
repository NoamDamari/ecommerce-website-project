const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const ordersController = require("../controllers/ordersController");

router.get("/:userId" , authenticateToken , ordersController.getUserOrders);

router.post("/addOrder" , authenticateToken , ordersController.addOrder);

module.exports = router;