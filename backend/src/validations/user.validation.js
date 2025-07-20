import Joi from "joi";

// Common patterns
const phoneRegex = /^0(([23489]\d{7})|(5[0-9]{8}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must be less than 50 characters",
    }),
  email: Joi.string().email().required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    }),
  phone: Joi.string().pattern(phoneRegex).allow("")
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Please provide a valid phone number",
    }),
  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Please provide a valid password",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email",
    }),
  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Please provide a valid password",
    }),
});