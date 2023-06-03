const Order = require("../../models/storeModels/Order");

// Get orders by user email
const getOrdersByUserEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const orders = await Order.find({ userEmail });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders." });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userEmail, items, totalAmount, shippingAddress } = req.body;
    const order = new Order({ userEmail, items, totalAmount, shippingAddress });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order." });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status." });
  }
};

module.exports = {
  getOrdersByUserEmail,
  createOrder,
  updateOrderStatus,
};
