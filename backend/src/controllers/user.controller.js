import asyncHandler from "express-async-handler";

import User from "../models/User.model.js";
import { userValidation } from "../services/validation.service.js";


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
  findUser(user);

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
  const errorMsg = userValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.phone = req.body.phone || user.phone;

  const updatedUser = await user.save();
  res.status(201).json({ success: true, data: updatedUser });
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

  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json({ success: true, data: "User deleted successfully" });
});

