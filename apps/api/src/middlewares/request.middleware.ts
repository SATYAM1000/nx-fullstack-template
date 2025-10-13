import { Request, Response, NextFunction } from 'express';
import { logger } from '../config';

export const requestLoggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`, {
    headers: req.headers,
    query: req.query,
    params: req.params,
    body: req.body,
  });
  next();
};
