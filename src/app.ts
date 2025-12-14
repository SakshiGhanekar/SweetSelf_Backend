/**
 * Main Express application setup
 * --------------------------------
 * This file initializes the Express app,
 * applies global middlewares, and exports
 * the configured app instance.
 */

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth/auth.routes.js";
import sweetRoutes from "./routes/sweets/sweet.routes.js";

const app = express();

/**
 * Enable Cross-Origin Resource Sharing (CORS)
 * Allows frontend applications (e.g., React)
 * running on different origins to access the API.
 */
app.use(cors());

/**
 * Built-in middleware to parse incoming JSON requests
 * Automatically converts JSON payloads into req.body
 */
app.use(express.json());

/**
 * Optional: Health check route
 * Useful for monitoring, deployments, and uptime checks
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/**
 * Mount API routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
