import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req: Request, _res: Response, next: NextFunction) => {
    return next(new Error('Too many requests'));
  },
});
