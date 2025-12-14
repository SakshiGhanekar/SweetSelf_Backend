/**
 * Application entry point
 * -----------------------
 * Loads environment variables, connects to the database,
 * and starts the Express server.
 */

import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import cron from "node-cron";
import axios from "axios";

/**
 * Load environment variables from .env file
 * Must be called before accessing process.env
 */
dotenv.config();

/**
 * Connect to the database before starting the server
 */
connectDB();

/**
 * Define server port
 * Falls back to 5000 if PORT is not specified in .env
 */
const PORT = process.env.PORT || 5000;

/**
 * Start the HTTP server
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
