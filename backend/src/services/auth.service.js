import bcrypt from "bcryptjs";

import { CustomError } from '../errors/CustomError.js';
import { generateToken } from "../utils/token.util.js";
import { ADMIN_EMAIL } from "../config/env.js";
import User from "../models/User.model.js";

export const signup = async (userData) => {
  const { name, email, password, phone } = userData;

  const user = await User.findOne({ email });
  if (user)
    throw new CustomError("user already exsist.", 400);

  let isAdmin = false;
  if (email === ADMIN_EMAIL)
    isAdmin = true;

  const newUser = await User.create({ name, email, password, phone, isAdmin });
};