import { Request, Response, NextFunction } from 'express';
import { httpError } from '../utils';

export const routeNotFoundMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    throw new Error('Route not found');
  } catch (err) {
    return httpError(next, err, req, 404);
  }
};
