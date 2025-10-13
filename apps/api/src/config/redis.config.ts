import Redis from 'ioredis';
import { env } from './env.config';
import { logger } from './logger.config';

const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  username: env.REDIS_USERNAME,
  password: env.REDIS_PASSWORD,
  db: 0,
  tls: env.NODE_ENV === 'production' ? {} : undefined,
  lazyConnect: true,
  maxRetriesPerRequest: null,
  connectTimeout: 10000,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  reconnectOnError: (error) => {
    logger.error(`❌ REDIS_ERROR: ${error.message}`);
    if (error.message.includes('READONLY')) return true;
    return false;
  },
});

redisClient.on('error', (err) => logger.error(`❌ REDIS_ERROR: ${JSON.stringify(err)}`));
redisClient.on('end', () => logger.error('❌ Redis connection closed'));
redisClient.on('reconnecting', () => logger.info('🔄 Redis is reconnecting...'));

async function initRedisClient() {
  try {
    await redisClient.connect();
    logger.info('✅ Connected to Redis');
  } catch (err: unknown) {
    logger.error(`❌ Failed to connect Redis: ${JSON.stringify(err, null, 2)}`);
    process.exit(1);
  }
}

export type RedisClient = typeof redisClient;

export { redisClient, initRedisClient };
