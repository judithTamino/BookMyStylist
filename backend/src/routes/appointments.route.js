import { Router } from "express";
import { cancelAppointment, bookAppointment, getAppointments, getAvailableTimeSlots, getAppointmentDetails, getAdminDashboardData } from "../controllers/appointment.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";

const appointmentRouter = Router();

appointmentRouter.get("/", protect, getAppointments);
appointmentRouter.get("/dashboard", protect, admin, getAdminDashboardData)
appointmentRouter.get("/:id", protect, getAppointmentDetails);
appointmentRouter.post("/:id", protect, bookAppointment);
appointmentRouter.get("/:date/available", protect, getAvailableTimeSlots);
appointmentRouter.patch("/:id/cancel", protect, cancelAppointment);

export default appointmentRouter;