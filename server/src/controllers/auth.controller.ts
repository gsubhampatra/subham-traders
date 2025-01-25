import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

// Register
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await registerUser(name, email, password, role);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

// Login
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const { token, user } = await loginUser(email, password);
    // Set cookie with the token, expires in 1 month
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    next(error);
  }
};
