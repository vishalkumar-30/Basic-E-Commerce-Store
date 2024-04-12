const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.post("/carts", CartController.createCart);

router.get("/carts", CartController.listCarts);

module.exports = router;
