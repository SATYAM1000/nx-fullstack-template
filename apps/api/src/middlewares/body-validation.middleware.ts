import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, infer as zInfer } from 'zod';
import { httpError } from '../utils';

export const validateMiddleware =
  <T extends ZodTypeAny>(schema: T) =>
  (req: Request<any, any, zInfer<T>>, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return httpError(next, result.error, req, 400);
    }

    req.body = result.data;
    next();
  };
