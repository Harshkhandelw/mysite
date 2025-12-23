const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: String,
    stock: Number,
    mrp: Number,
    sellingPrice: Number,
    brand: String,
    returnEligible: String,
    images: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
