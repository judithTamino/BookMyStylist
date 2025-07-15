import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.model.js";

export const protect = asyncHandler(async (req, res) => {
  let token = req.header.authorization;
  if (token && token.startsWith("Bearer"))
    token = token.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Please login");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select("-password");
  next();
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin)
    next();
  else {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }
};

