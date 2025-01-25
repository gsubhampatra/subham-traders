import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

// Middleware to protect routes
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.cookie?.split("=")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication token is required" });
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// Middleware for role-based authorization
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  };
};
