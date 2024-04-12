const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");

// Route to create a new item
router.post("/items", ItemController.createItem);

// Route to list all items
router.get("/items", ItemController.listItems);

module.exports = router;
