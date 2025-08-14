import asyncHandler from "express-async-handler";

import Appointment from "../models/Appointment.model.js";
import Service from "../models/Service.model.js";

import { appointmentValidation } from "../services/validation.service.js";
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
  const service = await Service.findById(serviceId);
  if (!service || !service.active) {
    const error = new Error("Service not available");
    error.statusCode = 400;
    throw error;
  }

  // calculate the end time based on service duration 
  const endTime = calculateEndTime(service.duration, startTime);

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
  });

  // send email and msg with appointment details
  await sendEmail(appointment, userInfo.name, service.name, service.price, userInfo.email);

  // add appointment to admin google calendar

  res.status(201).json({ success: true, msg: "Appointment booked successfully", data: appointment });
});

// @des    Get all appointments
// @route  GET api/appointments
// @access private
export const getAppointments = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const { status } = req.query;
  let filterByStatus = {};
  let appointments;

  if (status) filterByStatus.status = status;

  // check if user is admin or clinet
  if (userInfo.isAdmin) {
    appointments = await Appointment.find(filterByStatus)
      .populate("user", "name email")
      .populate("service", "name duration price")
  } else
    appointments = await Appointment.find({ ...filterByStatus, user: userInfo._id })
      .populate("service", "name duration price")
      .sort({ date: -1, startTime: -1 });

  // if appointment is in the past, status is completed
  appointments = appointments.map(appointment => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointment.date);

    if (appointmentDate.toDateString() <= currentDate.toDateString() && appointment.status === "confirmed") {
      const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
      const [hour, minute] = appointment.startTime.split(":").map(Number);
      const startTimeInMinutes = hour * 60 + minute;

      if (startTimeInMinutes < currentTime) {
        appointment.status = "completed";
        appointment.save();
      }
    }
    return appointment;
  });

  // count all appointments
  const allAppointments = await Appointment.countDocuments(
    userInfo.isAdmin ? {} : { user: userInfo._id }
  );

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

// @des    Cancel appointment 
// @route  PATCH api/appointments/:id/cancel
// @access private
export const cancelAppointment = asyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  const userInfo = req.user;

  // check if appointment exsits
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    const error = new Error("Appointment not available");
    error.statusCode = 400;
    throw error;
  }

  // check if user is authorized to cancel this appointment
  if (userInfo._id.toString() !== appointment.user.toString() && !userInfo.isAdmin) {
    const error = new Error("You are not authorized to cancel this user`s appointment.");
    error.statusCode = 403;
    throw error;
  }

  // check if cancellation is not past 48H of the scheduled appointment
  const appointmentDate = new Date(appointment.date);
  const currentDate = new Date();
  const cancellationDate = new Date(appointmentDate.getTime() - (48 * 60 * 60 * 1000));

  if (currentDate.getTime() >= cancellationDate.getTime()) {
    const error = new Error(`Appointments cannot be cancelled less than 48 hours before the scheduled date: ${appointmentDate.toDateString()}`);
    error.statusCode = 400;
    throw error;
  }

  // change status to canceled
  appointment.status = "cancelled";
  appointment.save();

  // send email & msg about appointment cancellation
  const service = await Service.findById(appointment.service);
  sendEmail(appointment, userInfo.name, service.name, service.price, userInfo.email, "cancelled");

  res.status(200).json({success: true, msg: "appointment cancelled successfully"})

  // remove appointment from admin google calendar
});