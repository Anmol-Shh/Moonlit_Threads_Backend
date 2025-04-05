import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import axios from 'axios';

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/order', async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount) * 100, // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        const auth = Buffer.from(
            `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
        ).toString("base64");

        const response = await axios.post(
            "https://api.razorpay.com/v1/orders",
            options,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        res.status(200).json({ order: response.data });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: "Payment order creation failed!" });
    }
});

export default router;
