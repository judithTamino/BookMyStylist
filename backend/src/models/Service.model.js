import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);
export default Service;