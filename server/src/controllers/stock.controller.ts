import { Request, Response } from "express";
import {
  incrementStock,
  decrementStock,
  updateStock,
  getStock,
  updateStockForTransaction,
} from "../services/stock.service";

// Increment stock
export const incrementStockController = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;
    const stock = await incrementStock(itemId, quantity);
    return res
      .status(200)
      .json({
        success: true,
        message: "Stock incremented successfully",
        stock,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to increment stock" });
  }
};

// Decrement stock
export const decrementStockController = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;
    const stock = await decrementStock(itemId, quantity);
    return res
      .status(200)
      .json({
        success: true,
        message: "Stock decremented successfully",
        stock,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to decrement stock" });
  }
};

// Update stock
export const updateStockController = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;
    const stock = await updateStock(itemId, quantity);
    return res
      .status(200)
      .json({ success: true, message: "Stock updated successfully", stock });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update stock" });
  }
};

// Get stock details
export const getStockController = async (_req: Request, res: Response) => {
  try {
    const stock = await getStock();
    return res
      .status(200)
      .json({
        success: true,
        message: "Stock details fetched successfully",
        stock,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch stock details" });
  }
};

export const updateStockByTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({ error: "Transaction ID is required" });
    }

    const result = await updateStockForTransaction(transactionId);
    return res.status(200).json({ message: result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update stock" });
  }
};

