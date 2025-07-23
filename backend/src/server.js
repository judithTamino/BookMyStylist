import express from "express";
import "dotenv/config";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";
import cors from "./middleware/cors.middleware.js";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import serviceRouter from "./routes/services.route.js";
import appointmentRouter from "./routes/appointments.route.js";

const app = express();

// Middleware
app.use(cors);
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/services", serviceRouter);
app.use("/api/appointments", appointmentRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));