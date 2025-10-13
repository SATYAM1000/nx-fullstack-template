import mongoose, { Connection } from 'mongoose';
import { env } from './env.config';
import { logger } from './logger.config';

const globalConns = global as typeof globalThis & {
  mainDB?: Connection;
  logsDB?: Connection;
};

export const connectToMainDB = async () => {
  if (globalConns.mainDB) return globalConns.mainDB;

  try {
    const conn = await mongoose.connect(env.MONGO_URI_MAIN);
    globalConns.mainDB = conn.connection;
    logger.info(`✅ Connected to Main MongoDB ${conn.connection.host}`);

    return conn.connection;
  } catch (error) {
    logger.error(`❌ Failed to connect to Main MongoDB: ${error}`);

    process.exit(1);
  }
};

export const connectToLogsDB = async () => {
  if (globalConns.logsDB) return globalConns.logsDB;

  try {
    const conn = await mongoose.createConnection(env.MONGO_URI_LOGS).asPromise();
    globalConns.logsDB = conn;
    logger.info(`✅ Connected to Logs MongoDB ${conn.host}`);

    return conn;
  } catch (error) {
    logger.error(`❌ Failed to connect to Logs MongoDB: ${error}`);
    process.exit(1);
  }
};

export const disconnectFromDB = async () => {
  try {
    if (globalConns.mainDB) {
      await globalConns.mainDB.close();
      logger.info('🛑 Disconnected from MainDB');
    }
    if (globalConns.logsDB) {
      await globalConns.logsDB.close();
      logger.info('🛑 Disconnected from LogsDB');
    }
  } catch (error) {
    logger.error('❌ Failed to disconnect from DB', {
      error: error instanceof Error ? error.stack : error,
    });
  }
};
