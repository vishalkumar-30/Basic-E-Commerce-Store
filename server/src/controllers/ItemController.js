const Item = require("../models/item");
const pool = require("../config/databases");
module.exports = {
  async createItem(req, res) {
    try {
      const { name } = req.body;

      const query = "INSERT INTO Items (name) VALUES (?)";
      const [result] = await pool.execute(query, [name]);

      const [insertedItem] = await pool.execute(
        "SELECT * FROM Items WHERE id = ?",
        [result.insertId]
      );

      res.status(201).json({ item: insertedItem[0] });
    } catch (error) {
      console.error("Error creating item:", error.message);
      res.status(400).json({ error: error.message });
    }
  },

  async listItems(req, res) {
    try {
      const query = "SELECT * FROM Items";
      const [items] = await pool.execute(query);

      res.json({ items });
    } catch (error) {
      console.error("Error listing items:", error.message);
      res.status(400).json({ error: error.message });
    }
  },
};
