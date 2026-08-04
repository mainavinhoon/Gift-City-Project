import mongoose from "mongoose";

export const MongodbConnection = async () => {
  const url = process.env.MONGODB_URL || process.env.MONGO_URL || process.env.MONGODB_URI;
  if (!url) {
    throw new Error("CRITICAL: MONGODB_URL environment variable is missing.");
  }
  
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  
  try {
    await mongoose.connect(url, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error;
  }
};
