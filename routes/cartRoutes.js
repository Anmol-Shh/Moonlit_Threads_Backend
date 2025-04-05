import express from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/cart/:userId", getCart);
router.post("/api/cart", addToCart);  // ✅ POST route for adding items to cart

// ✅ More general route (clear entire cart)
router.delete("/cart/clear/:userId", clearCart);

// ✅ More specific route (delete single item)
router.delete("/cart/:userId/:productId", removeFromCart);

export default router;
