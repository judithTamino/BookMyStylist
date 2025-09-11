import Joi from "joi";

// accepts times like "10:00", "14:30", ect...
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const currentDate = new Date();

export const appointmentSchema = Joi.object({
  date: Joi.date().required().min("now")
    .messages({
      "date.base": "Invalid date format",
      "date.empty": "Appointment date is required",
      "date.min": `Appointment date can not be before ${currentDate.toDateString()}`
    }),
  startTime: Joi.string().pattern(timeRegex).required()
    .messages({
      "string.base": "Appointment start time must be string",
      "string.pattern.base": "Appointment start time must be in HH:MM format",
      "string.empty": "Appointment start time is required",
    })
});