import Product from "../models/productModel.js"; // Ensure you import your Product model
import mongoose from "mongoose";

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Received Product ID:", id); // Debugging
  
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID format" });
      }
  
      const product = await Product.findById(new mongoose.Types.ObjectId(id)); // Convert string to ObjectId
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error); // Debugging
      res.status(500).json({ message: "Error fetching product", error });
    }
  };