import Cart from "../models/cartModel.js"; // Ensure Cart model is imported

export const addToCart = async (req, res) => {
    try {
      console.log("Request body:", req.body); // Debugging: Check what data is received
  
      const { userId, productId, title, quantity, size, price, image } = req.body;
  
      if (!price || !image) {
        return res.status(400).json({ message: "Price and Image are required." });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const existingItem = cart.items.find((item) => item.productId === productId && item.size === size);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, title,  quantity, size, price, image });
      }
  
      await cart.save();
      res.status(200).json({ message: "Item added to cart", cart });
  
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.json({ userId, items: [] }); // Return an empty cart instead of null
        }

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

// ✅ Remove Item from Cart
export const removeFromCart = async (req, res) => {
  try {
      const { userId, productId } = req.params;  // ✅ Get from URL, NOT req.body

      let cart = await Cart.findOne({ userId });

      if (cart) {
          cart.items = cart.items.filter(item => item.productId !== productId);
          await cart.save();
          return res.json({ message: "Item removed from cart", cart });
      }

      res.status(404).json({ message: "Cart not found" });
  } catch (error) {
      console.error("Error removing item:", error);
      res.status(500).json({ message: "Error removing item", error });
  }
};

export const clearCart = async (req, res) => {
  try {
      const { userId } = req.params;
      console.log("🔹 Clear Cart API Called for User:", userId);

      let cart = await Cart.findOne({ userId });

      if (cart) {
          cart.items = [];  
          await cart.save();
          return res.json({ message: "Cart cleared successfully", cart });
      }

      res.status(404).json({ message: "Cart not found" });
  } catch (error) {
      console.error("❌ Error in clearing cart:", error);
      res.status(500).json({ message: "Error clearing cart", error });
  }
};
