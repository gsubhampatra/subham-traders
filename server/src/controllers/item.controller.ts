import { Request, Response } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getItems,
} from "../services/item.service";

export const createItemController = async (req: Request, res: Response) => {
  try {
    const { name, unitPrice } = req.body;

    if (!name || !unitPrice) {
      return res.status(400).json({
        success: false,
        message: "Name and unit price are required",
      });
    }

    const item = await createItem(name, unitPrice);
    return res
      .status(201)
      .json({ success: true, message: "Item created", item });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create item" });
  }
};

export const updateItemController = async (req: Request, res: Response) => {
  try {
    const { name, unitPrice } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    if (!name && !unitPrice) {
      return res.status(400).json({
        success: false,
        message: "Name or unit price is required",
      });
    }

    const item = await updateItem(Number(id), { name, unitPrice });
    return res
      .status(200)
      .json({ success: true, message: "Item updated", item });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update item" });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    await deleteItem(parseInt(id));
    return res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete item" });
  }
};

export const getItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const item = await getItem(parseInt(id));
    return res
      .status(200)
      .json({ success: true, message: "Item fetched", item });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch item" });
  }
};

export const getAllItemsController = async (req: Request, res: Response) => {
  try {
    const items = await getItems();
    return res
      .status(200)
      .json({ success: true, message: "Items fetched", items });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch items" });
  }
};
