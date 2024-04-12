const Cart = require("../models/cart");
const pool = require('../config/databases'); 

module.exports = {
  async createCart(req, res) {
    try {
      const { userId, name, status, data } = req.body;

      // SQL query to insert a new cart with the `data` column
      const query = 'INSERT INTO Carts (userId, name, status, createdAt, updatedAt, data) VALUES (?, ?, ?, NOW(), NOW(), ?)';
      const [result] = await pool.execute(query, [userId, name, status, JSON.stringify(data)]);

      // Retrieve the inserted cart
      const [insertedCart] = await pool.execute('SELECT * FROM Carts WHERE id = ?', [result.insertId]);

      res.status(201).json({ cart: insertedCart[0] });
    } catch (error) {
      console.error('Error creating cart:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async listCarts(req, res) {
    try {
      // SQL query to select all carts
      const query = 'SELECT * FROM Carts';
      const [carts] = await pool.execute(query);

      res.json({ carts });
    } catch (error) {
      console.error('Error listing carts:', error.message);
      res.status(400).json({ error: error.message });
    }
  }
};
