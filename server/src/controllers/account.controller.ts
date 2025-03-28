import { Request, Response } from "express";
import prisma from "../prisma";
import { accountSchema, validateRequest } from "../utils/validate";
import { handleError } from "../utils/error-handeler";

// Create Account
export const createAccount = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(accountSchema, req.body);
    const account = await prisma.account.create({ data: validatedData });
    res.status(201).json(account);
  } catch (error) {
    handleError(error, res, "Error while creating account");
  }
};

// Get All Accounts
export const getAccounts = async (_req: Request, res: Response) => {
  try {
    const accounts = await prisma.account.findMany();
    res.json(accounts);
  } catch (error) {
    handleError(error, res, "Error while fetching accounts");
  }
};

// Get Single Account by ID
export const getAccountById = async (req: Request, res: Response) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!account) throw new Error("Account not found");
    res.json(account);
  } catch (error) {
    handleError(error, res, "Error while fetching account");
  }
};

// Update Account
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(accountSchema, req.body);
    const account = await prisma.account.update({
      where: { id: Number(req.params.id) },
      data: validatedData,
    });
    res.json(account);
  } catch (error) {
    handleError(error, res, "Error while updating account");
  }
};

// Delete Account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    await prisma.account.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    handleError(error, res, "Error while deleting account");
  }
};
