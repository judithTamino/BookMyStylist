import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true, trim: true },
  endTime: { type: String, required: true, trim: true },
  status: { type: String, enum: ["confirmed", "cancelled", "completed"], default: "confirmed" }
}, { timestamps: true });

// prevent double booking
appointmentSchema.index({ date: 1, startTime: 1 }, { unique: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;