import express from "express";
import chalk from "chalk";

import { errorHandler } from "./middleware/error.middleware.js";
import cors from "./middleware/cors.middleware.js";
import logger from './middleware/logger.middleware.js';

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import serviceRouter from "./routes/services.route.js";
import appointmentRouter from "./routes/appointments.route.js";

import connectDB from "./config/db.js";
import { PORT } from "./config/env.js";

const app = express();
const port = PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors);
app.use(logger);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/services", serviceRouter);
app.use("/api/appointments", appointmentRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreenBright(`Server is running on http://localhost:${port}`));
  connectDB();
});