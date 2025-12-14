/**
 * Sweet Schema
 * ------------
 * Represents sweets available in the sweet shop,
 * including pricing and inventory details.
 */

import { Schema, model } from "mongoose";

const sweetSchema = new Schema(
  {
    /**
     * Name of the sweet
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Category of the sweet (e.g., Mithai, Chocolate, Bakery)
     */
    category: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Price per unit
     */
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    /**
     * Available stock quantity
     */
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

/**
 * Export Sweet model
 */
export const Sweet = model("Sweet", sweetSchema);
