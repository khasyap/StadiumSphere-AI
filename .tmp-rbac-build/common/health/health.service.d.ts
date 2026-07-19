import { DatabaseHealthService } from '../../infrastructure/database/database.health.service';
import { RedisHealthService } from '../../infrastructure/redis/redis.health.service';
import type { HealthResponse } from './health.types';
export declare class HealthService {
    private readonly databaseHealthService;
    private readonly redisHealthService;
    constructor(databaseHealthService: DatabaseHealthService, redisHealthService: RedisHealthService);
    getHealth(): HealthResponse;
}
