import asyncHandler from "express-async-handler";

import Appointment from "../models/Appointment.model.js";
import Service from "../models/Service.model.js";

import { appointmentStatusValidation, appointmentValidation } from "../services/validation.service.js";
import { calculateEndTime, isTimeSoltBetweenWorkingHoures } from "../helpers/appointment.helper.js";
import { generateTimeSlots } from "../utils/timeSlots.utils.js";
import { sendEmail } from "../utils/sendEmail.util.js";


// @des    Book new appointment
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

  // calculate the end time based on service duration 
  const endTime = calculateEndTime(serviceExists.duration, startTime);

  // check if the time slot is available
  const appointmentExists = await Appointment.findOne({
    date: new Date(date),
    $or: [{
      startTime: { $lte: endTime },
      endTime: { $gte: startTime }
    }],
    status: { $in: ["confirmed"], $ne: "cancelled" }
  });

  if (appointmentExists) {
    const error = new Error("Time slot already booked");
    error.statusCode = 400;
    throw error;
  }

  // check if startTime or endTime is beyond working hours
  if (!isTimeSoltBetweenWorkingHoures(startTime, endTime, new Date(date))) {
    const error = new Error("Appointments can only be booked between 10:00 and 23:00. Please select a time within working hours");
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
// @access private
export const getAppointments = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const { status } = req.query;
  let filterByStatus = {};

  if (status) filterByStatus.status = status;

  let appointments;
  if (userInfo.isAdmin) {
    appointments = await Appointment.find(filterByStatus)
      .populate("user", "name email")
      .populate("service", "name duration price")
  } else
    appointments = await Appointment.find({ ...filterByStatus, user: userInfo._id })
      .populate("service", "name duration price")
      .sort({ date: -1, startTime: -1 });

  // count all appointments
  const allAppointments = await Appointment.countDocuments(
    userInfo.isAdmin ? {} : { user: userInfo._id }
  );

  // count pending appointments
  const pendingAppointments = await Appointment.countDocuments({
    ...filterByStatus,
    status: "pending",
    ...(!userInfo.isAdmin && { user: userInfo._id })
  });

  // count confirmed appointments
  const confirmedAppointments = await Appointment.countDocuments({
    ...filterByStatus,
    status: "confirmed",
    ...(!userInfo.isAdmin && { user: userInfo._id })
  });

  // count cancelled appointments
  const cancelledAppointments = await Appointment.countDocuments({
    ...filterByStatus,
    status: "cancelled",
    ...(!userInfo.isAdmin && { user: userInfo._id })
  });

  // count pending appointments
  const completedAppointments = await Appointment.countDocuments({
    ...filterByStatus,
    status: "completed",
    ...(!userInfo.isAdmin && { user: userInfo._id })
  });

  res.status(200).json({
    success: true,
    data: {
      appointments: appointments,
      statusSummary: {
        all: allAppointments,
        pending: pendingAppointments,
        confirmed: confirmedAppointments,
        canceled: cancelledAppointments,
        completed: completedAppointments
      }
    }
  })

});

// @des    Get available time slots for a date
// @route  GET api/appointments/:date/available
// @access private
export const getAvailableTimeSlots = asyncHandler(async (req, res) => {
  const date = new Date(req.params.date);
  const { serviceId } = req.query;

  if (!serviceId) {
    const error = new Error("Service ID is required");
    error.statusCode = 400;
    throw error;
  }

  // get all appointments for selected date
  const appointments = await Appointment.find({
    date,
    status: { $in: ["pending", "confirmed"] }
  });

  // get selected service
  const service = await Service.findById(serviceId);

  // generate all possible time slots
  const allSlots = generateTimeSlots(date);

  // generate time slots and filter out booked ones
  const availableSlots = allSlots.filter(solt => {
    // checked if time slot is available for the service duration
    const endTime = calculateEndTime(service.duration, solt);
    if (endTime > allSlots[allSlots.length - 1]) return false;

    // check if slot is already booked
    const isBooked = appointments.some(appointment => {
      return (
        (solt >= appointment.startTime && solt < appointment.endTime) ||
        (endTime > appointment.startTime && endTime <= appointment.endTime) ||
        (solt <= appointment.startTime && endTime >= appointment.endTime)
      );
    });
    return !isBooked;
  });
  res.status(200).json({ success: true, data: availableSlots });
});

// @des    Update appointment status
// @route  PATCH api/appointments/:id/status
// @access private - admin
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const { status } = req.body;

  // const errorMsg = appointmentStatusValidation(req.body);
  // if (errorMsg) {
  //   const error = new Error(errorMsg);
  //   error.statusCode = 400;
  //   throw error;
  // }

  // // check if appointment exsits
  // const appointment = await Appointment.findById(id)
  //   .populate("user", "name email")
  //   .populate("service", "name price");

  // if (!appointment) {
  //   const error = new Error("Appointment not found");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // // change status and save
  // appointment.status = status;
  // appointment.save();

  // // send email when appointment status is confirmed / cancelled
  // switch (appointment.status) {
  //   case "confirmed":
  //     sendEmail(appointment);
  //     break;

  //   case "cancelled":
  //     sendEmail(appointment, "cancelled");
  //     break;
  // }

  // res.status(200).json({ success: true, data: appointment, msg: "status change successfully" });
});

// @des    Cancel appointment 
// @route  PATCH api/appointments/:id/cancel
// @access private
export const cancelAppointment = asyncHandler(async (req, res) => { 
  
});