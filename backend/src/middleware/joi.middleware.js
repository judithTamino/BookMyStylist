import asyncHandler from "express-async-handler";

export const joiValidation = schema => asyncHandler(async (req, _res, next) => {
  const validate = await schema.validateAsync(req.body, { abortEarly: false });
  req.body = validate;
  next();
});