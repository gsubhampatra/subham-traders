import { Response } from "express";

export const handleError = (error: unknown, res: Response,message: string) => {
  const errorMessage = error instanceof Error ? error.message : message;
  console.error(errorMessage); // Log the error message to the console
  res.status(500).json({ error: errorMessage, message });
}
