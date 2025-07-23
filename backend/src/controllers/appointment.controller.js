import asyncHandler from "express-async-handler";
import Appointment from "../models/Appointment.model.js";

// @des    Create a new appointment
// @route  POST api/appointments
// @access private
export const createAppointment = asyncHandler(async(req, res) => {});

// @des    Get all appointments
// @route  GET api/appointments
// @access private - admin
export const getAllAppointments = asyncHandler(async(req, res) => {});

// @des    Get user appointments
// @route  GET api/appointments/:id
// @access private - user
export const getUserAppointments = asyncHandler(async(req, res) => {});

// @des    Get available time slots for a date
// @route  GET api/appointments/:date/available
// @access private
export const getAvailableTimeSlots = asyncHandler(async(req, res) => {});

// @des    Update appointment status
// @route  PATCH api/appointments/:id/status
// @access private - admin
export const updateAppointmentStatus = asyncHandler(async(req, res) => {});

// @des    Cancel appointment 
// @route  PATCH api/appointments/:id/cancel
// @access private
export const cancelAppointment = asyncHandler(async(req, res) => {});