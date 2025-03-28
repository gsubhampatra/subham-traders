import { Request, Response } from "express";
import { comparePassword, generateToken } from "../utils/auth";
import prisma from "../prisma";
import { handleError } from "../utils/error-handeler";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user.id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    handleError(error, res, "Error while logging in");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    handleError(error, res, "Error while logging out");
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.body.user.userId },
    });

    res.json(user);
  } catch (error) {
    handleError(error, res, "Error while getting current user");
  }
};
