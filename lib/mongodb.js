import mongoose from "mongoose";

export const MongodbConnection = async () => {
  const url = process.env.MONGO_URL || "";
  try {
    await mongoose.connect(
      "mongodb+srv://ADMIN:admin@giftcity.bketokk.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connect Mongodb");
  } catch (error) {
    console.log("error are occur for :", error);
  }
};
