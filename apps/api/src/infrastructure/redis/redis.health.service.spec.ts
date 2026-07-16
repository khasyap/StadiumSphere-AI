import type Redis from 'ioredis';

import { RedisHealthService } from './redis.health.service';

describe('RedisHealthService', () => {
  it('reports connected only when the Redis client is ready', () => {
    const client = { status: 'ready' } as Redis;
    const service = new RedisHealthService(client);

    expect(service.getStatus()).toBe('connected');

    client.status = 'end';

    expect(service.getStatus()).toBe('disconnected');
  });
});
