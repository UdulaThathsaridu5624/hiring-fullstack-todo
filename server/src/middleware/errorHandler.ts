import { Request,Response,NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
}

export const createAppError = (message: string, statusCode: number): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  return error;
}
const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode ?? 500
  console.error(err.stack)
  res.status(status).json({ message: err.message || 'Internal server error' })
}

export default errorHandler;