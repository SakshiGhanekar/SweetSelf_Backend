/**
 * Authentication Service
 * ----------------------
 * Handles user registration and login logic,
 * including password hashing and JWT generation.
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model.js";

export class AuthService {
  /**
   * Register a new user
   * - Hashes the password before saving
   */
  async register(data:any) {
    // Hash plain-text password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user with hashed password
    return User.create({
      ...data,
      password: hashedPassword,
    });
  }

  /**
   * Login user and generate JWT
   * @param {string} email
   * @param {string} password
   */
  async login(email:string, password:string) {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
