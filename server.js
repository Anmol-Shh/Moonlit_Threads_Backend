import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import imageRoutes from './routes/imageRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js'; 
import emailRoutes from './routes/emailRoutes.js';
import formRoutes from './routes/formRoutes.js';
import payment from './routes/paymentRoutes.js'; 
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://moonlit-threads-frontend.vercel.app", credentials: true }));
app.use(cookieParser()); // allows us to parse incoming cookies
  

// Routes

app.use('/', imageRoutes);
app.use('/', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/', emailRoutes);
app.use('/api/form', formRoutes);
app.use('/api/payment', payment);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'storeDB'
}).then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

const __dirname = path.resolve();


app.use("/api/auth", authRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
