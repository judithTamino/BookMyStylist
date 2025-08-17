import asyncHandler from "express-async-handler";
import Service from "../models/Service.model.js";
import { serviceValidation } from "../services/validation.service.js";
import Appointment from "../models/Appointment.model.js";


// @des    Get all active services
// @route  GET api/services
// @access public
export const getActiveServices = asyncHandler(async (req, res) => {
  let filterByCategory = {};
  const { category } = req.query;

  if (category) filterByCategory.category = category;

  const services = await Service.find({ active: true, ...filterByCategory }).select("-likes");
  res.status(200).json({ success: true, data: services });
});

// @des    Get all services
// @route  GET api/services/all
// @access private - admin
export const getAllServices = asyncHandler(async (req, res) => {
  let filterByCategory = {};
  const { category } = req.query;

  if (category) filterByCategory.category = category;

  const services = await Service.find(filterByCategory).select("-likes");
  res.status(200).json({ success: true, data: services });
});

// @des    Get service details
// @route  GET api/services/:id
// @access private - admin
export const getServiceDetail = asyncHandler(async (req, res) => {
    // check if service exsits
  const service = await Service.findById(req.params.id);
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: service });
});

// @des    Create service
// @route  POST api/services
// @access private - admin
export const createService = asyncHandler(async (req, res) => {
  const errorMsg = serviceValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  // Check if service exists
  const { name } = req.body;
  const serviceExsists = await Service.findOne({ name });
  if (serviceExsists) {
    const error = new Error("Service already exists");
    error.statusCode = 400;
    throw error;
  }

  const service = await Service.create(req.body);
  res.status(201).json({ success: true, msg: "Service created successfully", data: service });
});

// @des    Update service
// @route  PUT api/services/:id
// @access private - admin
export const updateService = asyncHandler(async (req, res) => {
  const errorMsg = serviceValidation(req.body);

  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  // check if service exsits
  const service = await Service.findById(req.params.id);
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  // update service
  const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({ success: true, msg: "Service updated successfully", data: updatedService });
});

// @des    Delete service
// @route  DELETE api/services/:id
// @access private - admin
export const deleteService = asyncHandler(async (req, res) => {
  // check if service exsits
  const service = await Service.findById(req.params.id);
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  // check if there are any bookings for this service
  const appointmentExists = await Appointment.findOne({
    service: req.params.id,
    date: { $gte: new Date() },
    status: { $in: ["confirmed"] }
  });

  if (appointmentExists) {
    const error = new Error("Cannot delete service with existing bookings");
    error.statusCode = 400;
    throw error;
  }

  // delete service
  await Service.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, msg: "Service deleted successfully", data: service });
});

// @des    Like/unlike service
// @route  PATCH api/services/:id
// @access private
export const likeService = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // check if service exsits
  const service = await Service.findById(req.params.id);
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }

  if (service.likes.includes(userId)) {
    service.likes = service.likes.filter(id => id != userId);
  } else service.likes.push(userId)

  await service.save();
  res.status(200).json({ success: true, msg: "Service liked successfully", data: service });
});