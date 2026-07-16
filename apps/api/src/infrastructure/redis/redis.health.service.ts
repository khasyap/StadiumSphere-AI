import { Inject, Injectable } from '@nestjs/common';
import type Redis from 'ioredis';

import { REDIS_CLIENT } from './redis.constants';

export type RedisConnectionStatus = 'connected' | 'disconnected';

@Injectable()
export class RedisHealthService {
  public constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  public getStatus(): RedisConnectionStatus {
    return this.client.status === 'ready' ? 'connected' : 'disconnected';
  }
}
