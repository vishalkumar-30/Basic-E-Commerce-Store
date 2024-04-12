const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");

router.post("/items", ItemController.createItem);

router.get("/items", ItemController.listItems);

module.exports = router;
