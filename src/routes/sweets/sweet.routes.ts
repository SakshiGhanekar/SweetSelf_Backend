/**
 * Sweets Routes
 * -------------
 * Defines API endpoints for managing sweets,
 * including listing, searching, adding, and purchasing.
 */

import { Router } from "express";
import { auth, adminOnly } from "../../middlewares/auth.middleware.js";
import {
  addSweet,
  getSweets,
  searchSweets,
  purchaseSweet,
  restockSweet,
  updateSweet,
  deleteSweet,
} from "../../controllers/sweets/sweet.controller.js";

const router = Router();

/**
 * Get all sweets
 * GET /api/sweets
 */
router.get("/", getSweets);

/**
 * Search sweets by name or category
 * GET /api/sweets/search
 */
router.get("/search", searchSweets);

/**
 * Add a new sweet (Admin Only)
 * POST /api/sweets
 */
router.post("/", auth, adminOnly, addSweet);

/**
 * Purchase a sweet (Protected)
 * POST /api/sweets/:id/purchase
 */
router.post("/:id/purchase", auth, purchaseSweet);

/**
 * Restock a sweet (Admin Only)
 * POST /api/sweets/:id/restock
 */
router.post("/:id/restock", auth, adminOnly, restockSweet);

/**
 * Update a sweet (Admin Only)
 * PUT /api/sweets/:id
 */
router.put("/:id", auth, adminOnly, updateSweet);

/**
 * Delete a sweet (Admin Only)
 * DELETE /api/sweets/:id
 */
router.delete("/:id", auth, adminOnly, deleteSweet);

export default router;
