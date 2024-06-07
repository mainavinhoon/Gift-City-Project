import mongoose from "mongoose";

export const MongodbConnection = async () => {
  const url = process.env.MONGO_URL || "mongodb+srv://navinrawat103:GRB0JqLy24f9hO0w@gift-city-project.zbaa9ii.mongodb.net/?retryWrites=true&w=majority&appName=Gift-city-project";
  try {
    await mongoose.connect(
      url
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("error are occur for :", error);
  }
};
