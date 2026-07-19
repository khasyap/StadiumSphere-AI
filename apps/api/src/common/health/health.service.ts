import { Inject, Injectable } from '@nestjs/common';

import { DatabaseHealthService } from '../../infrastructure/database/database.health.service';
import { RedisHealthService } from '../../infrastructure/redis/redis.health.service';
import type { HealthResponse } from './health.types';

@Injectable()
export class HealthService {
  public constructor(
    @Inject(DatabaseHealthService)
    private readonly databaseHealthService: DatabaseHealthService,
    @Inject(RedisHealthService) private readonly redisHealthService: RedisHealthService,
  ) {}

  public getHealth(): HealthResponse {
    const database = this.databaseHealthService.getStatus();
    const redis = this.redisHealthService.getStatus();

    return {
      apiVersion: 'v1',
      database,
      environment: process.env.NODE_ENV ?? 'unknown',
      redis,
      service: 'api',
      status: database === 'connected' && redis === 'connected' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      version: '0.1.0',
    };
  }
}
