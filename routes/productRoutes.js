import express from "express";
import { getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Fetch all products
router.get("/", getAllProducts);

// Fetch a single product by ID
router.get("/:id", getProductById);

export default router;
