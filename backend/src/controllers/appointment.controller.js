import asyncHandler from "express-async-handler";
import { appointmentValidation } from "../services/validation.service.js";

import Appointment from "../models/Appointment.model.js";
import Service from "../models/Service.model.js";
import { calculateEndTime } from "../helpers/appointment.helper.js";

// @des    Create a new appointment
// @route  POST api/appointments/:id
// @access private
export const bookAppointment = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const serviceId = req.params.id;
  const { date, startTime, notes } = req.body;

  // validate input
  const errorMsg = appointmentValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  // check if service exsits and is active
  const serviceExists = await Service.findById(serviceId);
  if (!serviceExists || !serviceExists.active) {
    const error = new Error("Service not available");
    error.statusCode = 400;
    throw error;
  }

  // prevent past booking
  const selectedDate = new Date(`${date}T${startTime}`);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    const error = new Error("Cannot book an appointment in the past");
    error.statusCode = 400;
    throw error;
  }

  // calculate the end time based on service duration 
  const endTime = calculateEndTime(serviceExists.duration, startTime, date)

  // check if the time slot is available
  const appointmentExists = await Appointment.findOne({
    date: new Date(date),
    $or: [{
      startTime: { $lt: endTime },
      endTime: { $gt: startTime }
    }],
    status: { $in: ["pending", "confirmed"], $ne: "cancelled" }
  });

  if (appointmentExists) {
    const error = new Error("Time slot already booked");
    error.statusCode = 400;
    throw error;
  }

  // create appointment 
  const appointment = await Appointment.create({
    user: userInfo._id,
    service: serviceId,
    date,
    startTime,
    endTime,
    notes
  })

  res.status(201).json({ success: true, msg: "Appointment booked successfully", data: appointment });
});

// @des    Get all appointments
// @route  GET api/appointments
// @access private - admin
export const getAllAppointments = asyncHandler(async (req, res) => {
   
});

// @des    Get user appointments
// @route  GET api/appointments/:id
// @access private - user
export const getUserAppointments = asyncHandler(async (req, res) => { });

// @des    Get available time slots for a date
// @route  GET api/appointments/:date/available
// @access private
export const getAvailableTimeSlots = asyncHandler(async (req, res) => { });

// @des    Update appointment status
// @route  PATCH api/appointments/:id/status
// @access private - admin
export const updateAppointmentStatus = asyncHandler(async (req, res) => { });

// @des    Cancel appointment 
// @route  PATCH api/appointments/:id/cancel
// @access private
export const cancelAppointment = asyncHandler(async (req, res) => { });