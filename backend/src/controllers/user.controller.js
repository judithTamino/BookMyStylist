import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";
import { updateUserValidation, workingHouresValidation } from "../services/validation.service.js";
import { validStartTime } from "../helpers/user.helper.js";

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

  if (req.body.password && req.body.password.trim() !== "")
    user.password = req.body.password;

  const updatedUser = await user.save();
  const { password, ...userWithoutPassword } = updatedUser.toObject();

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

  await User.findByIdAndDelete(id);

  res.status(200).json({ success: true, msg: "User deleted successfully" });
});

// @des    Insert working hours
// @route  POST api/users/working-hours
// @access private - admin
export const insertAndUpdateWorkingHours = asyncHandler(async (req, res) => {
  const userInfo = req.user;
  const { workingHours } = req.body;

  if (workingHours.length === 0) {
    const error = new Error("Working hours must be a non-empty array");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userInfo._id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Loop through the incoming workingHours and validate each day
  for (const day of workingHours) {
    const errorMsg = workingHouresValidation(day);
    if (errorMsg) {
      const error = new Error(errorMsg);
      error.statusCode = 400;
      throw error;
    }

    // check if start time is before end time
    if (!validStartTime(day) && !day.dayOff) {
      const error = new Error(`For ${day.day}, start time must be before end time`);
      error.statusCode = 400;
      throw error;
    }

    // Check if the day already exists -> update it, else insert
    const existingDayIndex = user.workingHoures.findIndex(d => d.day === day.day);

    if (existingDayIndex !== -1)
      user.workingHoures[existingDayIndex] = day; // update working hours
    else
      user.workingHoures.push(day); // insert working hours
  }

  await user.save();
  res.status(201).json({
    success: true,
    data: user.workingHoures,
    msg: "Working hours saved successfully"
  });
});



