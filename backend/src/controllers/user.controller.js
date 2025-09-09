import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";
import { updateUserValidation, userValidation, workingHouresValidation } from "../services/validation.service.js";
import { validStartTime } from "../helpers/user.helper.js";


// @des    Get all users
// @route  GET api/users/
// @access private - admin
export const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({ isAdmin: false }).select("-password");
  res.status(200).json({ success: true, data: users });
});

// @des    Get user profile
// @route  GET api/users/:id
// @access private
export const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;

  // Check auth
  if (userInfo._id != id && !userInfo.isAdmin) {
    const error = new Error("You are not authorized to view this user`s details");
    error.statusCode = 403;
    throw error;
  }

  const user = await User.findById(id).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ success: true, data: user });
});

// @des    Update user profile
// @route  PUT api/users/:id
// @access private - user 
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;
  const user = await User.findById(id);

  // Check auth
  if (userInfo._id != id) {
    const error = new Error("You are not authorized to edit this user`s details");
    error.statusCode = 403;
    throw error;
  }

  // Validation
  const errorMsg = updateUserValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;

  if(req.body.password && req.body.password.trim() !== "")
    user.password = req.body.password; 

  console.log(user);

  const updatedUser = await user.save();
  const {password, ...userWithoutPassword} = updatedUser.toObject();

  res.status(201).json({ success: true, data: userWithoutPassword, msg: "User details updated successfully" });
});

// @des    Delete user
// @route  DELETE api/users/:id
// @access private
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;

  // Check auth
  if (userInfo._id != id && !userInfo.isAdmin) {
    const error = new Error("You are not authorized to delete this user");
    error.statusCode = 403;
    throw error;
  }

  res.status(200).json({ success: true, msg: "User deleted successfully" });
});

// @des    Insert working hours
// @route  POST api/users/working-hours
// @access private - admin
export const insertWorkingHours = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const { workingHours } = req.body;
  const user = await User.findById(userInfo._id);

  if (!Array.isArray(workingHours) || workingHours.length === 0) {
    const error = new Error("workingHours must be a non-empty array");
    error.statusCode = 400;
    throw error;
  }

  // Validation
  workingHours.forEach(dayEntry => {
    const errorMsg = workingHouresValidation(dayEntry);
    if (errorMsg) {
      const error = new Error(errorMsg);
      error.statusCode = 400;
      throw error;
    }

    // check if start time is before end time
    if (!validStartTime(dayEntry)) {
      const error = new Error(`For ${dayEntry.day}, start time must be before end time`);
      error.statusCode = 400;
      throw error;
    }

    if (!user.workingHoures.find((d) => d.day === dayEntry.day)) {
      user.workingHoures.push(dayEntry);
    }
  });

  await user.save();
  res.status(201).json({
    success: true,
    data: user.workingHoures,
    msg: "Working hours inserted successfully"
  });
});

// @des    Update working hours
// @route  PUT api/users/working-hours
// @access private - admin
export const updateWorkingHours = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const { workingHours } = req.body;

  if (!Array.isArray(workingHours) || workingHours.length === 0) {
    const error = new Error("workingHours must be a non-empty array");
    error.statusCode = 400;
    throw error;
  }

  for (const dayEntry of workingHours) {
    const errorMsg = workingHouresValidation(dayEntry);
    if (errorMsg) {
      const error = new Error(errorMsg);
      error.statusCode = 400;
      throw error;
    }

    // check if start time is before end time
    if (!validStartTime(dayEntry)) {
      const error = new Error(`For ${dayEntry.day}, start time must be before end time`);
      error.statusCode = 400;
      throw error;
    }
  }

  // update the updated working hours
  const user = await User.findById(userInfo._id);
  for (let i = 0; i < user.workingHoures.length; i++) {
    for (let j = 0; j < workingHours.length; j++) {
      if (user.workingHoures[i].day === workingHours[j].day)
        user.workingHoures[i] = workingHours[j];
    }
  }

  await user.save();
  res.status(201).json({
    success: true,
    data: user.workingHoures,
    msg: "Working hours updated successfully"
  });
});

