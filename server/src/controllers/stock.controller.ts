import { Request, Response } from "express";
import prisma from "../prisma";
import { handleError } from "../utils/error-handeler";

// Increment Stock
export const incrementStock = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity || quantity <= 0) {
      throw new Error("Invalid itemId or quantity");
    }

    const stock = await prisma.stock.upsert({
      where: { itemId },
      update: { quantity: { increment: quantity } },
      create: { itemId, quantity },
    });

    res.json(stock);
  } catch (error) {
    handleError(error, res, "Error while incrementing stock");
  }
};

// Decrement Stock
export const decrementStock = async (req: Request, res: Response) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId || !quantity || quantity <= 0) {
      throw new Error("Invalid itemId or quantity");
    }

    const stock = await prisma.stock.findUnique({ where: { itemId } });

    if (!stock || stock.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    const updatedStock = await prisma.stock.update({
      where: { itemId },
      data: { quantity: { decrement: quantity } },
    });

    res.json(updatedStock);
  } catch (error) {
    handleError(error, res, "Error while decrementing stock");
  }
};

// Get Stocks
export const getStocks = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.findMany({
      include: { item: true },
    });

    if (!stock) throw new Error("Stocks not found");

    res.json(stock);
  } catch (error) {
    handleError(error, res, "Error while fetching stocks");
  }
};
