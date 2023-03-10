import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';
  res.status(status).json({ message });
}

export default errorMiddleware;
