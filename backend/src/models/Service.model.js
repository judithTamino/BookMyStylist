import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, lowercase: true },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
  active: { type: Boolean, default: true },
  likes: [String],
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);
export default Service;