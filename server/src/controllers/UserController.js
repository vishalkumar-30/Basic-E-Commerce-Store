const User = require("../models/user");
const jwt = require("jsonwebtoken");
const pool = require("../config/databases");
module.exports = {
  async createUser(req, res) {
    try {
      const { username, password } = req.body;

      const query = "INSERT INTO Users (username, password) VALUES (?, ?)";
      const [result] = await pool.execute(query, [username, password]);

      const user = { id: result.insertId, username, password };

      res.status(201).json({ user });
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const query =
        "SELECT * FROM Users WHERE username = ? AND password = ? LIMIT 1";
      const [rows] = await pool.execute(query, [username, password]);

      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid username/password" });
      }

      const user = rows[0];

      const token = jwt.sign({ userId: user.id }, "your_secret_key", {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(400).json({ error: error.message });
    }
  },
};
