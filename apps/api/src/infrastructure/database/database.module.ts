import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from 'nestjs-pino';
import type { Connection } from 'mongoose';

import type { ApiEnvironment } from '../../config/environment.validation';
import { DatabaseHealthService } from './database.health.service';
import { DatabaseLifecycleService } from './database.lifecycle.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService, Logger],
      useFactory: (configuration: ConfigService<ApiEnvironment, true>, logger: Logger) => {
        const databaseName = configuration.getOrThrow('MONGODB_DATABASE');
        let connectionAttempts = 0;

        return {
          uri: configuration.getOrThrow('MONGODB_URI'),
          lazyConnection: true,
          dbName: databaseName,
          serverSelectionTimeoutMS: configuration.getOrThrow(
            'MONGODB_SERVER_SELECTION_TIMEOUT_MS',
          ),
          connectionFactory: (connection: Connection) => {
            connection.on('connecting', () => {
              connectionAttempts += 1;
              logger.log({ attempt: connectionAttempts, database: databaseName }, 'MongoDB connecting');
            });
            connection.on('connected', () => {
              connectionAttempts = 0;
              logger.log({ database: databaseName }, 'MongoDB connected');
            });
            connection.on('disconnected', () => {
              logger.warn('MongoDB disconnected');
            });
            connection.on('reconnected', () => {
              logger.log({ database: databaseName }, 'MongoDB reconnected');
            });
            connection.on('reconnectFailed', () => {
              logger.error('MongoDB reconnection failed');
            });
            connection.on('error', (error: Error) => {
              logger.error({ err: error }, 'MongoDB connection failure');
            });

            return connection;
          },
        };
      },
    }),
  ],
  providers: [DatabaseHealthService, DatabaseLifecycleService],
  exports: [DatabaseHealthService],
})
export class DatabaseModule {}
