const errorHandler = (err, _req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      error = new Error("Resource not found");
      error.statusCode = 400;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      error = new Error("Duplicate field value entered");
      error.statusCode = 400;
    }

    // Mongoose validation key
    if (err.name === "validationError") {
      const msg = Object.values(err.errors).map(val => val.message);
      error = new Error(msg.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      msg: error.message || "Something went wrong",
      stack: process.env.ENV === "development" ? err.stack : null
    });

  } catch (error) {
    next(error);
  }
};

export default errorHandler;