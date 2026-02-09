import mongoose from "mongoose";
import chalk from "chalk";
import { MONGODB_LOCAL_URI, MONGODB_ATLAS_URI, ENV } from "./env.js";

const connectDB = async () => {
  try {
    if (ENV === "development")
      await mongoose.connect(`${MONGODB_LOCAL_URI}/BookMyStylist`);
    if (ENV === "production")
      await mongoose.connect(`${MONGODB_ATLAS_URI}/BookMyStylist`);
    console.log(chalk.bgGreenBright(`DB connected successfully on ${ENV} mode`));
  } catch (error) {
    console.log(chalk.bgRedBright("DB connection error: ", error.message));
    process.exit(1);
  }
};

export default connectDB;