import mongoose from "mongoose";

export const MongodbConnection = async () => {
  const url = process.env.MONGO_URL;
  if (!url) {
    console.error("MONGO_URL environment variable is missing.");
    return;
  }
  
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("error are occur for :", error);
  }
};
