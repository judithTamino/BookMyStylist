import { Router } from "express";
import { cancelAppointment, createAppointment, getAllAppointments, getAvailableTimeSlots, getUserAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const appointmentRouter = Router();

appointmentRouter.post("/", protect, createAppointment);
appointmentRouter.get("/", protect, admin, getAllAppointments);
appointmentRouter.get("/:id", protect, getUserAppointments);
appointmentRouter.get("/:date/available", protect, getAvailableTimeSlots);
appointmentRouter.patch("/:id/status", protect, admin, updateAppointmentStatus);
appointmentRouter.patch("/:id/cancel", protect, cancelAppointment);

export default appointmentRouter;