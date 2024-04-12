const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Route to create a new user
router.post("/users", UserController.createUser);

// Route to list all users
router.get("/users", UserController.listUsers);

// Route for user login
router.post("/users/login", UserController.login);

module.exports = router;
