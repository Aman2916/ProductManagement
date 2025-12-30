const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    default: () => randomUUID(),
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Books", "Home", "Sports"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
