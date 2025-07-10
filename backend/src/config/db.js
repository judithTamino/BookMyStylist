import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGODB_LOCAL_URI; 
  try {
    await mongoose.connect(`${MONGO_URI}/BookMyStylist`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;