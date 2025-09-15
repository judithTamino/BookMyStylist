import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";
import { JWT_SECRET } from "../config/env.js";

export const protect = asyncHandler(async (req, _res, next) => {
  let token = req.headers.authorization;

  console.log(token);

  if (token && token.startsWith("Bearer"))
    token = token.split(" ")[1];

  if (!token) {
    const error = new Error("Please login");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  const user = await User.findById(decoded._id).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  
  req.user = user;
  next();
});

export const admin = (req, _res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    const error = new Error("Access denied, admin only");
    error.statusCode = 403;
    throw error;
  }
};

