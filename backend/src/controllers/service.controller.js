import asyncHandler from "express-async-handler";
import Service from "../models/Service.model.js";
import { serviceValidation } from "../services/validation.service.js";


// @des    Get all active services
// @route  GET api/services
// @access public
export const getActiveServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ active: true }).select("-likes");
  res.status(200).json({ success: true, data: services });
});

// @des    Get all services
// @route  GET api/services/all
// @access private - admin
export const getAllServices = asyncHandler(async (req, res) => { });

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
export const updateService = asyncHandler(async (req, res) => { });

// @des    Delete service
// @route  DELETE api/services
// @access private - admin
export const deleteService = asyncHandler(async (req, res) => { });

// @des    Like/unlike service
// @route  PATCH api/services
// @access private
export const likeService = asyncHandler(async (req, res) => { });