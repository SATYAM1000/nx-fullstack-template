import { Request, Response, NextFunction } from 'express';
import { httpError } from '../utils';

interface JsonSyntaxError extends SyntaxError {
  body?: unknown;
}

export const validateJsonMiddleware = (
  err: unknown,
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (isJsonSyntaxError(err)) {
    return httpError(next, new Error('Invalid JSON format'), req, 400);
  }

  next(err);
};

function isJsonSyntaxError(err: unknown): err is JsonSyntaxError {
  return err instanceof SyntaxError && typeof err === 'object' && err !== null && 'body' in err;
}
