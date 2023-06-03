const Product = require("../../models/storeModels/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const product = await Product.findOne({ title });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      images,
      description,
      price,
      category,
      brand,
      colors,
      sizes,
    } = req.body;
    const product = new Product({
      title,
      images,
      description,
      price,
      category,
      brand,
      colors,
      sizes,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title } = req.params;
    const { images, description, price, category, brand, colors, sizes } =
      req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { title },
      { images, description, price, category, brand, colors, sizes },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { title } = req.params;
    const deletedProduct = await Product.findOneAndRemove({ title });
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllProducts,
  getProductByTitle,
  createProduct,
  updateProduct,
  deleteProduct,
};
