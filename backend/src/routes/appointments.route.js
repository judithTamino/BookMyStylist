import { Router } from "express";
import { cancelAppointment, bookAppointment, getAllAppointments, getAvailableTimeSlots, getUserAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const appointmentRouter = Router();

appointmentRouter.post("/:id", protect, bookAppointment);
appointmentRouter.get("/", protect, getAllAppointments);
appointmentRouter.get("/:id", protect, getUserAppointments);
appointmentRouter.get("/:date/available", protect, getAvailableTimeSlots);
appointmentRouter.patch("/:id/status", protect, admin, updateAppointmentStatus);
appointmentRouter.patch("/:id/cancel", protect, cancelAppointment);

export default appointmentRouter;