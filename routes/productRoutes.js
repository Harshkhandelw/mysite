const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require("../models/Product");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      type: req.body.type,
      stock: req.body.stock,
      mrp: req.body.mrp,
      sellingPrice: req.body.sellingPrice,
      brand: req.body.brand,
      returnEligible: req.body.returnEligible,
      image: req.file ? req.file.path : null
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
