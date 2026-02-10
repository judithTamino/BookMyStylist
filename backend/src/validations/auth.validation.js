import Joi from "joi";

const phoneRegex = /^0(([23489]\d{7})|(5[0-9]{8}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const signupSchema = Joi.object({
  name: Joi.string().min(2).required()
  .messages({
    "string.empty":"This field can`t be empty.",
    "string.min":"Name must be at least 2 characters long.",
    "any.required":"This field is required."
  }),

  email: Joi.string().email().required()
  .messages({
    "string.empty":"This field can`t be empty.",
    "string.email":"Please provide a valid email.",
    "any.required":"This field is required."
  }),

  phone: Joi.string().pattern(phoneRegex).optional()
  .messages({
    "string.empty":"This field can`t be empty.",
    "string.pattern.base":"Please provide a valid phone number.",
    "any.required":"This field is required."
  }),

  password: Joi.string().pattern(passwordRegex).required()
  .messages({
    "string.empty":"This field can`t be empty.",
    "string.pattern.base":"Please provide a valid password.",
    "any.required":"This field is required."
  })
});