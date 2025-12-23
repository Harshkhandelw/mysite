const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  stock: Number,
  mrp: Number,
  sellingPrice: Number,
  brand: String,
  returnEligible: String,
  image: String
});

module.exports = mongoose.model("Product", productSchema);
