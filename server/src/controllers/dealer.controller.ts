import { Request, Response } from "express";
import {
  createDealer,
  deleteDealer,
  getAllDealers,
  searchDealer,
  updateDealer,
} from "../services/dealer.service";

// Create a new dealer
export const createDealerController = async (req: Request, res: Response) => {
  try {
    const { name, contact, address } = req.body;
    const dealer = await createDealer(name, contact, address);
    return res
      .status(201)
      .json({ success: true, message: "Dealer created successfully", dealer });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create dealer" });
  }
};

// Get all dealers
export const getAllDealersController = async (_req: Request, res: Response) => {
  try {
    const dealers = await getAllDealers();
    return res.status(200).json({
      success: true,
      message: "Dealers fetched successfully",
      dealers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch dealers" });
  }
};

// Search dealer
export const searchDealerController = async (req: Request, res: Response) => {
  try {
    const { name } = req.query as { name: string };
    const dealers = await searchDealer(name);
    return res.status(200).json({
      success: true,
      message: "Dealers searched successfully",
      dealers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to search dealer" });
  }
};

//delete dealer
export const deleteDealerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Dealer id is required" });
    }

    const dealerId = parseInt(id);

    const deletedDealer = await deleteDealer(dealerId);

    return res.status(200).json({
      success: true,
      message: "Dealer deleted successfully",
      dealer: deletedDealer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete dealer" });
  }
};

//update dealer
export const updateDealerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact, address } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Dealer id is required" });
    }

    if (!name && !contact && !address) {
      return res.status(400).json({
        success: false,
        message: "At least one of the fields is required",
      });
    }

    const dealerId = parseInt(id);

    const updatedDealer = await updateDealer(dealerId, {
      name,
      contact,
      address,
    });

    return res.status(200).json({
      success: true,
      message: "Dealer updated successfully",
      dealer: updatedDealer,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to update dealer" });
  }
};
