import { Request, Response } from "express";
import prisma from "../prisma";
import { validateRequest, dealerSchema } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Create Dealer
export const createDealer = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(dealerSchema, req.body);
    const dealer = await prisma.dealer.create({ data: validatedData });
    res.status(201).json(dealer);
  } catch (error) {
    handleError(error, res, "Error while creating dealer");
  }
};

// Get All Dealers
export const getDealers = async (_req: Request, res: Response) => {
  try {
    const dealers = await prisma.dealer.findMany();
    res.json(dealers);
  } catch (error) {
    handleError(error, res, "Error while fetching dealers");
  }
};

// Get Single Dealer by ID
export const getDealerById = async (req: Request, res: Response) => {
  try {
    const dealer = await prisma.dealer.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!dealer) throw new Error("Dealer not found");
    res.json(dealer);
  } catch (error) {
    handleError(error, res, "Error while fetching dealer");
  }
};

// Update Dealer
export const updateDealer = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(dealerSchema, req.body);
    const dealer = await prisma.dealer.update({
      where: { id: Number(req.params.id) },
      data: validatedData,
    });
    res.json(dealer);
  } catch (error) {
    handleError(error, res, "Error while updating dealer");
  }
};

// Delete Dealer
export const deleteDealer = async (req: Request, res: Response) => {
  try {
    await prisma.dealer.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Dealer deleted successfully" });
  } catch (error) {
    handleError(error, res, "Error while deleting dealer");
  }
};
