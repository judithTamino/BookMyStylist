import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { loginValidation, userValidation } from "../services/validation.service.js";

// @des    Register a new user
// @route  POST api/auth/register
// @access public
export const registerUser = asyncHandler(async (req, res) => {
  const errorMsg = userValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  const { name, email, phone, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("User with this email already exists");
    error.statusCode = 400;
    throw error;
  }

  // Create Admin
  let isAdmin = false;
  if (email === process.env.ADMIN_EMAIL)
     isAdmin = true;

  // Create new  user
  const user = await User.create({ name, email, password, phone, isAdmin });
  res.status(201).json({ success: true, msg: "User created successfully", data: user });
});

// @des    Login user
// @route  POST api/auth/login
// @access public
export const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const errorMsg = loginValidation(req.body);
  if (errorMsg) {
    const error = new Error(errorMsg);
    error.statusCode = 400;
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.status(200).json({ success: true, msg: "user login successfully", data: token });
  } else {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
});

// generate JWT Token 
const generateToken = user => {
  return jwt.sign({ _id: user._id, isAdmin: user.isAdmin  }, process.env.JWT_SECRET, { expiresIn: "7d" })
};