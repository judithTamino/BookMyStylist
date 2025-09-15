import asyncHandler from "express-async-handler";

import Appointment from "../models/Appointment.model.js";
import Service from "../models/Service.model.js";

import { appointmentValidation } from "../services/validation.service.js";
import { calculateEndTime, convertToMinutes, getWorkingDay, isTimeSoltBetweenWorkingHoures } from "../helpers/appointment.helper.js";
import { generateTimeSlots } from "../utils/timeSlots.utils.js";
import { sendEmail } from "../utils/sendEmail.util.js";
import { application } from "express";


// @des    Book new appointment
// @route  POST api/appointments/:id
// @access private
export const bookAppointment = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const serviceId = req.params.id;
  let { date, startTime } = req.body;

  // validate request body
  const errorMsg = appointmentValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  // check if service exists and is active
  const service = await Service.findById(serviceId);
  if (!service || !service.active) {
    const error = new Error("Service not available");
    error.statusCode = 404;
    throw error;
  }

  // calculate the end time based on service duration 
  const endTime = calculateEndTime(service.duration, startTime);

  // check working hours
  if (! await isTimeSoltBetweenWorkingHoures(startTime, endTime, new Date(date))) {
    const error = new Error("The selected appointment time is outside the hairdresser's working hours. \nPlease choose a time within the available schedule.");
    error.statusCode = 400;
    throw error;
  }

  // check if the time slot is booked
  const appointmentExists = await Appointment.findOne({
    date: new Date(date),
    $or: [
      { startTime: { $lte: endTime }, endTime: { $gte: startTime } }
    ]
    ,
    status: { $in: ["confirmed"] }
  });

  if (appointmentExists) {
    const error = new Error("Time slot already booked");
    error.statusCode = 400;
    throw error;
  }

  // booking must be within this week until Friday or next week if today is Saturday
  const today = new Date();
  const bookAppointmentInAdvance = new Date(today.setDate(today.getDate() + 14));

  if (new Date(date) > bookAppointmentInAdvance) {
    const error = new Error("Appointments must be booked at least 2 weeks in advance.");
    error.statusCode = 400;
    throw error;
  }

  date = new Date(date).setUTCHours(0,0,0,0);
  const appointment = await Appointment.create({
    user: userInfo._id,
    service: serviceId,
    date,
    startTime,
    endTime
  });

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
  const currentDate = new Date();
  const hour = currentDate.getHours().toString();
  const minute = currentDate.getMinutes().toString(); 
  const currentTime = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;

  await Appointment.updateMany({
    date: {$lte: currentDate},
    status: "confirmed",
    startTime: {$lte: currentTime}
  }, {$set: {status: "completed"}});

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

// @des    Get appointment details
// @route  GET api/appointments/:id
// @access private
export const getAppointmentDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;

  // check if appoitment exsits
  const appointment = await Appointment.findById(id)
    .populate("user", "name email")
    .populate("service", "name duration price");

  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  // check if user auth to see appointment details
  if (userInfo._id.toString() !== appointment.user._id.toString() && !userInfo.isAdmin) {
    const error = new Error("You are not authorized to see this user`s appointment details.");
    error.statusCode = 403;
    throw error;
  }

  res.status(200).json({ success: true, data: appointment });
});

// @des    Get available time slots for a date
// @route  GET api/appointments/:date/available
// @access private
export const getAvailableTimeSlots = asyncHandler(async (req, res) => {
  const date = new Date(req.params.date).setUTCHours(0,0,0,0);
  const { serviceId } = req.query;
  const workingDay = await getWorkingDay(date);

  if (!serviceId) {
    const error = new Error("Service ID is required");
    error.statusCode = 400;
    throw error;
  }

  // get all appointments for selected date
  const appointments = await Appointment.find({
    date,
    status: { $in: ["confirmed"] }
  });

  // get selected service
  const service = await Service.findById(serviceId);

  // generate all possible time slots
  const allSlots = await generateTimeSlots(date);
  // if (allSlots.length === 0) {
  //   const error = new Error("No time slots available in this date");
  //   error.statusCode = 400;
  //   throw error;
  // }

  // generate time slots and filter out booked ones
  const availableSlots = allSlots.filter(solt => {
    // checked if time slot is available for the service duration
    const endTime = calculateEndTime(service.duration, solt);

    if (endTime > workingDay.endTime) {
      return false;
    };

    // check if slot is already booked
    const isBooked = appointments.some(appointment => {
      return solt < appointment.endTime && endTime > appointment.startTime
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

  console.log(userInfo);

  // check if appointment exsits
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
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

  // send email about appointment cancellation
  const service = await Service.findById(appointment.service);
  sendEmail(appointment, userInfo.name, service.name, service.price, userInfo.email, "cancelled");

  res.status(200).json({ success: true, msg: "appointment cancelled successfully" })

  // remove appointment from admin google calendar
});