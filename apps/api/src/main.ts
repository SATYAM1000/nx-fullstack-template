import app from './app';
import {
  connectToLogsDB,
  connectToMainDB,
  disconnectFromDB,
  env,
  initRedisClient,
  logger,
  redisClient,
} from './config';

(async function startServer() {
  try {
    await connectToMainDB();
    await Promise.all([connectToLogsDB(), initRedisClient()]);

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server is up and running in ${env.NODE_ENV} mode`);
    });

    process.on('SIGINT', async () => {
      logger.info('👋 Shutting down gracefully...');
      await disconnectFromDB();
      await redisClient.quit();
      process.exit(0);
    });
  } catch (error) {
    logger.error(`❌ Failed to connect to DB: ${error}`);
    process.exit(1);
  }
})();
