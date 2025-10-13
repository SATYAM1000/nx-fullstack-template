import { Request, Response } from 'express';
import { ApiSuccessResponse } from '@nx-template/types';
import { env, logger } from '../config';

export const httpResponse = (
  req: Request,
  res: Response,
  responseStatusCode: number,
  responseMessage: string,
  data: unknown = null
): void => {
  const response: ApiSuccessResponse = {
    success: true,
    statusCode: responseStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.url,
    },
    message: responseMessage,
    data: data,
  };

  logger.info(`✅ CONTROLLER_RESPONSE: ${JSON.stringify(response)}`);

  if (env.NODE_ENV === 'production') {
    delete response.request.ip;
  }
  res.status(responseStatusCode).json(response);
};
