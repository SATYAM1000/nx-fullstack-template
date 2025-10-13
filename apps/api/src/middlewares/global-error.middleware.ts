import { NextFunction, Request, Response } from 'express';
import { ApiErrorResponse } from '@nx-template/types';
import { logger } from '../config';

export const globalErrorMiddleware = (
  err: ApiErrorResponse,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  logger.error(`❌ CONTROLLER_ERROR: ${JSON.stringify(err)}`);
  res.status(err.statusCode).json(err);
};
