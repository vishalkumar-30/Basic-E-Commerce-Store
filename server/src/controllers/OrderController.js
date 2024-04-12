const Order = require("../models/order");

module.exports = {
  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const cartId = req.body.cartId;
      const order = await Order.create({ userId, cartId });
      res.status(201).json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listOrders(req, res) {
    try {
      const orders = await Order.findAll();
      res.json({ orders });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
