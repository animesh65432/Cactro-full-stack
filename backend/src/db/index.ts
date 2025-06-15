import mongoose from 'mongoose';
import { config } from '../config';

export const connectdb = async () => {
    try {
        await mongoose.connect(config.MONGO_URI as string);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}