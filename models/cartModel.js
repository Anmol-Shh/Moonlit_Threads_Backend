import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            size: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true }
        }
    ]
});

export default mongoose.model("Cart", cartSchema);
