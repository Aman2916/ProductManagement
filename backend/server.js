const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/schema");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/productDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send({ message: "Product Created Successfully", product });
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(products);
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).send({ message: "Product Deleted Successfully" });
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const product = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.status(200).send({ message: "Product Updated Successfully", product });
});

app.listen(PORT, () => {
  console.log(`Backend Runiing on http://localhost:${PORT}`);
});
