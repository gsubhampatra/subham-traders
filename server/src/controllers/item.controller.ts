import { Request, Response } from "express";
import prisma from "../prisma";
import { validateRequest, itemSchema } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Create Item
export const createItem = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(itemSchema, req.body);
    const item = await prisma.item.create({ data: validatedData });
    res.status(201).json(item);
  } catch (error) {
    handleError(error, res, "Error while creating item");
  }
};

// Get All Items
export const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany({
      include: { stock: true },
    });
    res.json(items);
  } catch (error) {
    handleError(error, res, "Error while fetching items");
  }
};

// Get Single Item by ID
export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(req.params.id) },
      include: { stock: true },
    });
    if (!item) throw new Error("Item not found");
    res.json(item);
  } catch (error) {
    handleError(error, res, "Error while fetching item");
  }
};

// Update Item
export const updateItem = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(itemSchema, req.body);
    const item = await prisma.item.update({
      where: { id: Number(req.params.id) },
      data: validatedData,
    });
    res.json(item);
  } catch (error) {
    handleError(error, res, "Error while updating item");
  }
};

// Delete Item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    await prisma.item.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    handleError(error, res, "Error while deleting item");
  }
};
