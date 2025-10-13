import { z } from 'zod';

export const envSchema = z.object({
  HOST: z.string().min(1, 'HOST is required'),
  NODE_ENV: z.enum(['development', 'test', 'production', 'staging']).default('development'),
  PORT: z.coerce.number().default(4000),
  MONGO_URI_MAIN: z.string().refine((value) => z.url().safeParse(value).success, {
    message: 'MONGO_URI_MAIN must be a valid MongoDB URI',
  }),
  MONGO_URI_LOGS: z.string().refine((value) => z.url().safeParse(value).success, {
    message: 'MONGO_URI_LOGS must be a valid MongoDB URI',
  }),
  AWS_ACCESS_KEY_ID: z.string().min(1, 'AWS_ACCESS_KEY_ID is required'),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, 'AWS_SECRET_ACCESS_KEY is required'),
  AWS_S3_BUCKET_NAME: z.string().min(1, 'AWS_S3_BUCKET_NAME is required'),
  AWS_S3_BUCKET_REGION: z.string().min(1, 'AWS_S3_BUCKET_REGION is required'),

  REDIS_HOST: z.string().min(1, 'REDIS_HOST is required'),
  REDIS_PORT: z.string().min(1, 'REDIS_PORT is required'),
  REDIS_USERNAME: z.string().min(1, 'REDIS_USERNAME is required'),
  REDIS_PASSWORD: z.string().min(1, 'REDIS_PASSWORD is required'),

  FRONTEND_URL: z.string().min(1, 'FRONTEND_URL is required'),
  API_PREFIX: z.string().min(1, 'API_PREFIX is required'),
});

export type Env = z.infer<typeof envSchema>;
