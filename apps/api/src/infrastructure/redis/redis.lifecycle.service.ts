import { Inject, Injectable, type OnApplicationShutdown } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import type Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisLifecycleService implements OnApplicationShutdown {
  public constructor(
    @Inject(REDIS_CLIENT) private readonly client: Redis,
    private readonly logger: Logger,
  ) {}

  public async onApplicationShutdown(signal?: string): Promise<void> {
    if (this.client.status === 'end') {
      return;
    }

    this.logger.log({ signal: signal ?? 'application' }, 'Redis disconnecting');
    await this.client.quit();
    this.logger.log('Redis disconnected');
  }
}
