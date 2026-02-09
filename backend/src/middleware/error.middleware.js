import Joi from "joi";
import { ENV } from "../config/env.js";
import { CustomError } from "../errors/CustomError.js";

export const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  const isDev = ENV === 'development';

  const response = {
    success: false,
    status: statusCode,
    message: error.message || 'Something went wrong',
    errors: error.errors || [],
    ...(isDev && { stack: error.stack }),
  };

  // Joi validation
  if (Joi.isError(error))
    return res.status(422).json({
      ...response,
      status: 422,
      message: "Validation error",
      errors: error.details.map(detail => ({
        field: detail.context?.key,
        message: detail.message
      })),
    });

  // Mongo duplicate key
  if (error.code === 11000)
    return res.status(400).json({
      ...response,
      message: "Duplicate field value"
    });

  // CustomError
  if (error instanceof CustomError)
    return res.status(error.statusCode).json(response);

  // Default fallback
  return res.status(statusCode).json(response);
};







// const errorHandler = (err, _req, res, next) => {

//   try {
//     let error = { ...err };
//     error.message = err.message;

//     // Mongoose bad ObjectId
//     if (err.name === "CastError") {
//       error = new Error("Resource not found");
//       error.statusCode = 400;
//     }

//     // Mongoose duplicate key
//     if (err.code === 11000) {
//       error = new Error("Duplicate field value entered");
//       error.statusCode = 400;
//     }

//     // Mongoose validation key
//     if (err.name === "validationError") {
//       const msg = Object.values(err.errors).map(val => val.message);
//       error = new Error(msg.join(", "));
//       error.statusCode = 400;
//     }

//     res.status(error.statusCode || 500).json({
//       success: false,
//       msg: error.message || "Something went wrong",
//       stack: process.env.ENV === "development" ? err.stack : null
//     });

//   } catch (error) {
//     next(error);
//   }
// };

// export default errorHandler;

