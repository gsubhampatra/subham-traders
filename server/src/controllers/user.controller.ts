// controllers/user.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";
import { handleError } from "../utils/error-handeler";
import {
  updateUserSchema,
  userSchema,
  validateRequest,
} from "../utils/validate";
import { hashPassword } from "../utils/auth";

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(userSchema, req.body);
    const hashedPassword = await hashPassword(validatedData.password);

    const user = await prisma.user.create({
      data: { ...validatedData, password: hashedPassword },
    });

    res.json(user);
  } catch (error) {
    handleError(error, res, "Error while creating user");
  }
};

// Get All Users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    handleError(error, res, "Error while getting users");
  }
};

// Get Single User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    handleError(error, res, "Error while getting user by ID");
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedData = validateRequest(updateUserSchema, req.body);
    const hashedPassword = await hashPassword(validatedData.password);

    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        name: validatedData.name ? validatedData.name : undefined,
        email: validatedData.email ? validatedData.email : undefined,
        password: hashedPassword ? hashedPassword : undefined,
        PhoneNumber: validatedData.PhoneNumber
          ? validatedData.PhoneNumber
          : undefined,
        role: validatedData.role ? validatedData.role : undefined,
      },
    });
    res.json(user);
  } catch (error) {
    handleError(error, res, "Error while updating user");
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    handleError(error, res, "Error while deleting user");
  }
};
