const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/users", UserController.createUser);

router.get("/users", UserController.listUsers);

router.post("/users/login", UserController.login);

module.exports = router;
