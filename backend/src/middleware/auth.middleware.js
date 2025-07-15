import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer"))
    token = token.split(" ")[1];

  if (!token) {
    const error = new Error("Please login");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  
  req.user = user;
  next();
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin)
    next();
  else {
    const error = new Error("Access denied, Admin only");
    error.statusCode = 403;
    throw error;
  }
};

