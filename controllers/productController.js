const Product = require("../models/Product");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    const product = new Product({
      ...req.body,
      images
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : undefined;

    const updatedData = {
      ...req.body,
      ...(images && { images })
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
