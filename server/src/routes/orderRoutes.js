const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// Route to create an order (convert cart to order)
router.post("/orders", OrderController.createOrder);

// Route to list all orders
router.get("/orders", OrderController.listOrders);

module.exports = router;
