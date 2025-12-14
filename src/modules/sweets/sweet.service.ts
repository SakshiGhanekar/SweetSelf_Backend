/**
 * Sweets Service
 * --------------
 * Handles business logic related to sweets,
 * including creation, retrieval, search, and purchase.
 */

import { Sweet } from "./sweet.model.js";

interface CreateSweetData {
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SearchQuery {
  name?: string;
  category?: string;
}

export class SweetsService {
  /**
   * Create a new sweet
   */
  async create(data: CreateSweetData) {
    return Sweet.create(data);
  }

  /**
   * Fetch all sweets
   */
  async findAll() {
    return Sweet.find();
  }

  /**
   * Search sweets by name or category
   * - Name search is case-insensitive
   */
  async search(query: SearchQuery) {
    const filter: { name?: RegExp; category?: string } = {};

    if (query.name) {
      filter.name = new RegExp(query.name, "i");
    }

    if (query.category) {
      filter.category = query.category;
    }

    return Sweet.find(filter);
  }

  /**
   * Purchase a sweet
   * Decreases stock quantity by 1
   */
  async purchase(id: string) {
    const sweet = await Sweet.findById(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    if (sweet.quantity <= 0) {
      throw new Error("Sweet is out of stock");
    }

    sweet.quantity -= 1;
    return sweet.save();
  }

  /**
   * Restock a sweet
   * Increases stock quantity by the specified amount
   */
  async restock(id: string, quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const sweet = await Sweet.findById(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    sweet.quantity += quantity;
    return sweet.save();
  }

  /**
   * Update a sweet
   */
  async update(id: string, data: Partial<CreateSweetData>) {
    const sweet = await Sweet.findByIdAndUpdate(id, data, { new: true });

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    return sweet;
  }

  /**
   * Delete a sweet
   */
  async delete(id: string) {
    const sweet = await Sweet.findByIdAndDelete(id);

    if (!sweet) {
      throw new Error("Sweet not found");
    }

    return sweet;
  }
}
