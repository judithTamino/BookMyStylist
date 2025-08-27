import mongoose from "mongoose";
import { MONGODB_LOCAL_URI } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_LOCAL_URI}/BookMyStylist`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;