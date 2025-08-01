import Joi from "joi";

// accepts times like "10:00", "14:30", ect...
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const appointmentSchema = Joi.object({
  date: Joi.date().required().min("now")
    .messages({
      "date.base": "Invalid date format",
      "date.empty": "Appointment date is required",
      "date.min": "Appointment date must not be in the past"
    }),
  startTime: Joi.string().pattern(timeRegex).required()
    .messages({
      "string.base": "Appointment start time must be string",
      "string.pattern.base": "Appointment start time must be in HH:MM format",
      "string.empty": "Appointment start time is required",
    }),
  notes: Joi.string().max(500)
    .messages({
      "string.base": "Appointment notes must be string",
      "string.max": "Appointment notes must be less than 500 characters",
    })
});

export const appointmentStatusSchema = Joi.object({
  status: Joi.string().required().valid("pending", "confirmed", "cancelled", "completed")
    .messages({
      "string.base": "Appointment status must be string",
      "string.empty": "Appointment status is required",
      "string.valid": "Appointment status must be one of [pending, confirmed, cancelled, completed]"
    })
});