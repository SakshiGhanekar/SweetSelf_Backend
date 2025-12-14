/**
 * Sweets Controller
 * -----------------
 * Handles HTTP requests related to sweets
 * and delegates business logic to SweetsService.
 */

import type { Request, Response, NextFunction } from "express";
import { SweetsService } from "../../modules/sweets/sweet.service.js";

const sweetsService = new SweetsService();

/**
 * Add a new sweet
 * POST /api/sweets
 */
export const addSweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sweet = await sweetsService.create(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all sweets
 * GET /api/sweets
 */
export const getSweets = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sweets = await sweetsService.findAll();
    res.status(200).json(sweets);
  } catch (error) {
    next(error);
  }
};

/**
 * Search sweets by name or category
 * GET /api/sweets/search
 */
export const searchSweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await sweetsService.search(req.query);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * Purchase a sweet
 * POST /api/sweets/:id/purchase
 */
export const purchaseSweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Sweet ID is required" });
      return;
    }
    const purchasedSweet = await sweetsService.purchase(id);
    res.status(200).json(purchasedSweet);
  } catch (error) {
    next(error);
  }
};

/**
 * Restock a sweet
 * POST /api/sweets/:id/restock
 */
export const restockSweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!id) {
      res.status(400).json({ error: "Sweet ID is required" });
      return;
    }

    if (!quantity || quantity <= 0) {
      res.status(400).json({ error: "Quantity must be a positive number" });
      return;
    }

    const sweet = await sweetsService.restock(id, quantity);
    res.status(200).json({ message: "Sweet restocked successfully", sweet });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a sweet
 * PUT /api/sweets/:id
 */
export const updateSweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Sweet ID is required" });
      return;
    }
    const sweet = await sweetsService.update(id, req.body);
    res.status(200).json(sweet);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a sweet
 * DELETE /api/sweets/:id
 */
export const deleteSweet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Sweet ID is required" });
      return;
    }
    const sweet = await sweetsService.delete(id);
    res.status(200).json({ message: "Sweet deleted successfully", sweet });
  } catch (error) {
    next(error);
  }
};
