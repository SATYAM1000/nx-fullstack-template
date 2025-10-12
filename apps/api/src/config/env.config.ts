import path from 'path';
import dotenv from 'dotenv';
import { envSchema } from '../validations';

const nodeEnv = process.env.NODE_ENV || 'development';

const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

dotenv.config({ path: envPath });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
