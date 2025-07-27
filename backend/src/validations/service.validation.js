import Joi from "joi";

export const serviceSchema = Joi.object({
  name: Joi.string().min(2).max(200).required()
    .messages({
      "string.base": "Service name must be a string",
      "string.empty": "Service name is required",
      "string.min": "Service name must be at least 2 characters",
      "string.max": "Service name must be less than 200 characters",
    }),
  description: Joi.string().max(500).allow(" ")
    .messages({
      "string.base": "Service description must be a string",
      "string.max": "Service description must be less than 500 characters"
    }),
  duration: Joi.number().integer().min(15).max(360).required()
    .messages({
      "nummber.base": "Service duration must be a number",
      "nummber.integer": "Service duration must be integer",
      "nummber.empty": "Service duration is required",
      "nummber.min": "Service duration must be at least 15 minutes",
      "nummber.max": "Service duration must be less than 360 minutes",
    }),
  price: Joi.number().precision(2).positive().min(30).required()
    .messages({
      "nummber.base": "Service price must be a number",
      "nummber.precision": "Service price must have at most 2 decimal places",
      "nummber.empty": "Service price is required",
      "nummber.min": "Service price must be at least 30 ILS",
      "nummber.positive": "Service price must be positive number",
    }),
  active: Joi.boolean()
    .messages({
      "string.base": "Service active status must be true or false",
    }),
  
});