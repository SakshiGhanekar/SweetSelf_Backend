/**
 * User Schema
 * -----------
 * Defines the structure of the User collection
 * and includes basic validations.
 */

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    /**
     * User's name
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * User's email address
     * Must be unique and stored in lowercase
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Hashed user password
     * Never store plain text passwords
     */
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    /**
     * User role for authorization
     */
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

/**
 * Export User model
 */
export const User = model("User", userSchema);
