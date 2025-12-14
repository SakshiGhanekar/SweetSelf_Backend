/**
 * MongoDB connection utility
 * --------------------------
 * Handles connecting the application to MongoDB
 * using Mongoose.
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 */
export const connectDB = async () => {
  try {
    // Ensure MongoDB connection string is available
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Establish connection
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error:any) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};
