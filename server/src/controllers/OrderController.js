const Order = require("../models/order");

module.exports = {
  async createOrder(req, res) {
    try {
      // Assume user's ID is available in req.user.id (from authentication middleware)
      const userId = req.user.id;
      const cartId = req.body.cartId;
      // Logic to convert cart to order
      // For simplicity, let's assume the cart is converted to an order directly
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
