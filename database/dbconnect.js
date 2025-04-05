import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// MongoDB connection function
export const dbconnect = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is undefined. Please check your .env file.");
        }
        const conn = await mongoose.connect(uri, {
            dbName: "YourDatabaseName"
        });
        console.log(`The DB is connected with host: ${conn.connection.host}`);
    } catch (err) {
        console.error("Database connection error:", err);
    }
};
