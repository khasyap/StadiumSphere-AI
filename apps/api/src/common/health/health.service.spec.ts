import { HealthService } from './health.service';
import type { DatabaseHealthService } from '../../infrastructure/database/database.health.service';
import type { RedisHealthService } from '../../infrastructure/redis/redis.health.service';

describe('HealthService', () => {
  it('reports ok when MongoDB and Redis are connected', () => {
    const databaseHealthService = {
      getStatus: jest.fn().mockReturnValue('connected'),
    } as unknown as DatabaseHealthService;
    const redisHealthService = {
      getStatus: jest.fn().mockReturnValue('connected'),
    } as unknown as RedisHealthService;

    const service = new HealthService(databaseHealthService, redisHealthService);

    expect(service.getHealth()).toMatchObject({
      database: 'connected',
      redis: 'connected',
      service: 'api',
      status: 'ok',
      version: '0.1.0',
    });
  });

  it('reports degraded when an infrastructure dependency is unavailable', () => {
    const databaseHealthService = {
      getStatus: jest.fn().mockReturnValue('disconnected'),
    } as unknown as DatabaseHealthService;
    const redisHealthService = {
      getStatus: jest.fn().mockReturnValue('connected'),
    } as unknown as RedisHealthService;

    const service = new HealthService(databaseHealthService, redisHealthService);

    expect(service.getHealth()).toMatchObject({
      database: 'disconnected',
      redis: 'connected',
      status: 'degraded',
    });
  });
});
