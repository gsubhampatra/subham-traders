import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
export function errorMiddleware(
  error: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  logger.error(error.message, error);

  res.status(statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
}