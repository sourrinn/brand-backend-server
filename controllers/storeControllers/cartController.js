const Cart = require("../../models/storeModels/cart");

// Get cart by user email
const getCartByUserEmail = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const cart = await Cart.findOne({ userEmail });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { userEmail, productTitle, quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userEmail },
      { $push: { items: { productTitle, quantity } } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update item quantity in cart
const updateCartItemQuantity = async (req, res) => {
  const { userEmail, productTitle, quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userEmail, "items.productTitle": productTitle },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { userEmail, productTitle } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userEmail },
      { $pull: { items: { productTitle } } },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCartByUserEmail,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
};
