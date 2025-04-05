import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Product from "../models/productModel.js";

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, { dbName: "storeDB" })
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection error:", err));

// Read product data from JSON
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

// Construct AWS S3 URLs dynamically based on category
const formattedProducts = products.map(product => {
  const bucketName = product.category === "Fragrance"
    ? process.env.AWS_FRAGRANCE_BUCKET_NAME
    : process.env.AWS_WOMEN_BUCKET_NAME;

  return {
    ...product,
    image: `https://${bucketName}.s3.amazonaws.com/products/${product.folderName}.jpg`
  };
});

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(formattedProducts);
    console.log("✅ Products seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    mongoose.connection.close();
  }
};

seedProducts();
