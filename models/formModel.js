import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String, required: true },
    eventType: { type: String, required: true },
    referralSource: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

export default mongoose.model("Form", formSchema);
