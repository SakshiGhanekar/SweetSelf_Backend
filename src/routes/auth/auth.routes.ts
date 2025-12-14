/**
 * Auth Routes
 * -----------
 * Defines authentication-related API endpoints
 * such as user registration and login.
 */

import { Router } from "express";
import { register, login } from "../../controllers/auth/auth.controller.js";

const router = Router();

/**
 * Register a new user
 * POST /api/auth/register
 */
router.post("/register", register);

/**
 * Login an existing user
 * POST /api/auth/login
 */
router.post("/login", login);

export default router;
