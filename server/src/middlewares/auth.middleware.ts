import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

// Middleware to protect routes
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded); // Log the decoded token for debugging
    req.body.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error);
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
