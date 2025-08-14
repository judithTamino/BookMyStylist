import { Router } from "express";
import { cancelAppointment, bookAppointment, getAppointments, getAvailableTimeSlots } from "../controllers/appointment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const appointmentRouter = Router();

appointmentRouter.post("/:id", protect, bookAppointment);
appointmentRouter.get("/", protect, getAppointments);
appointmentRouter.get("/:date/available", protect, getAvailableTimeSlots);
appointmentRouter.patch("/:id/cancel", protect, cancelAppointment);

export default appointmentRouter;