/**
 * Auth Controller
 * ---------------
 * Handles HTTP requests related to authentication
 * and delegates business logic to AuthService.
 */

import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../../modules/auth/auth.service.js";

const authService = new AuthService();

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
