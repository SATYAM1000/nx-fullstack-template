import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import cors from 'cors';

import { env, rateLimiter } from './config';
import {
  globalErrorMiddleware,
  requestLoggerMiddleware,
  routeNotFoundMiddleware,
  validateJsonMiddleware,
} from './middlewares';
import { registerRoutes } from './routes';

const app = express();

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(rateLimiter);

app.use(express.urlencoded({ extended: true }));

app.use(validateJsonMiddleware);

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: [env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(requestLoggerMiddleware);

registerRoutes(app);

app.use(routeNotFoundMiddleware);

app.use(globalErrorMiddleware);

export default app;
