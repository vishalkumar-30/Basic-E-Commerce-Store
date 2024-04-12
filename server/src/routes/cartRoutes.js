const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

// Route to create a new cart and add items to the cart
router.post("/carts", CartController.createCart);

// Route to list all carts
router.get("/carts", CartController.listCarts);

module.exports = router;
