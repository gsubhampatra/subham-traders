import { Request, Response } from "express";
import {
  createTransaction,
  getAllTransactions,
  getTransactionsByDate,
} from "../services/transaction.service";

// Create a transaction
export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { dealerId, userId, items, totalAmount, paidAmount } = req.body;
    const transaction = await createTransaction(
      dealerId,
      userId,
      items,
      totalAmount,
      paidAmount
    );
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create transaction" });
  }
};

// Get all transactions
export const getAllTransactionsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transactions" });
  }
};

export const getTransactionsByDateController = async (
  req: Request,
  res: Response
) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date are required",
      });
    }

    const transactions = await getTransactionsByDate(
      new Date(startDate as string),
      new Date(endDate as string)
    );
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch transactions" });
  }
};
