import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { loginValidation, userValidation } from "../services/validation.service.js";

// @des    Register a new user
// @route  POST api/auth/register
// @access public
export const registerUser = asyncHandler(async (req, res) => {
  const error = userValidation(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { name, email, phone, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create & save user
  const user = new User({ name, email, password, phone });
  user.save();
  res.status(201).json({ success: true, msg: "User create successfully" });
});

// @des    Login user
// @route  POST api/auth/login
// @access public
export const loginUser = asyncHandler(async (req, res) => {
  const error = loginValidation(req.body);
  if (error) {
    res.status(400);
    throw new Error(error);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.status(200).json({success: true, data: token});
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @des    Logout user
// @route  POST api/auth/logout
// @access public
export const logoutUser = asyncHandler(async (req, res) => { });


// Generate JWT Token 
const generateToken = id => jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "7d" });