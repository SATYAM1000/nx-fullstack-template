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

const host = env.HOST;
const port = env.PORT;

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

app.use(routeNotFoundMiddleware);

app.use(globalErrorMiddleware);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
