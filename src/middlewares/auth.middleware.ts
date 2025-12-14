/**
 * Authentication Middleware
 * -------------------------
 * Verifies JWT token and attaches decoded user data
 * to the request object for protected routes.
 */

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Protect routes using JWT authentication
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Verify and decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Admin-only middleware
 * Requires auth middleware to run first
 */
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  
  next();
};
