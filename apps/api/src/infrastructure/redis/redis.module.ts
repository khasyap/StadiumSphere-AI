import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { RedisOptions } from 'ioredis';
import Redis from 'ioredis';
import { Logger } from 'nestjs-pino';

import type { ApiEnvironment } from '../../config/environment.validation';
import { REDIS_CLIENT } from './redis.constants';
import { RedisHealthService } from './redis.health.service';
import { RedisLifecycleService } from './redis.lifecycle.service';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService, Logger],
      useFactory: (configuration: ConfigService<ApiEnvironment, true>, logger: Logger): Redis => {
        const password = configuration.get('REDIS_PASSWORD');
        const options: RedisOptions = {
          host: configuration.getOrThrow('REDIS_HOST'),
          lazyConnect: true,
          port: configuration.getOrThrow('REDIS_PORT'),
        };

        if (password !== undefined) {
          options.password = password;
        }

        const client = new Redis(options);
        let reconnectAttempts = 0;

        client.on('connect', () => {
          reconnectAttempts = 0;
          logger.log('Redis connected');
        });
        client.on('close', () => {
          logger.warn('Redis disconnected');
        });
        client.on('reconnecting', (delay: number) => {
          reconnectAttempts += 1;
          logger.warn({ attempt: reconnectAttempts, delay }, 'Redis retry attempt');
        });
        client.on('error', (error: Error) => {
          logger.error({ err: error }, 'Redis connection failure');
        });

        void client.connect().catch((error: Error) => {
          logger.error({ err: error }, 'Redis startup connection failure');
        });

        return client;
      },
    },
    RedisHealthService,
    RedisLifecycleService,
  ],
  exports: [REDIS_CLIENT, RedisHealthService],
})
export class RedisModule {}
