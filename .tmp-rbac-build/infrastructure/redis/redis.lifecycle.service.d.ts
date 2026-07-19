import { type OnApplicationShutdown } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import type Redis from 'ioredis';
export declare class RedisLifecycleService implements OnApplicationShutdown {
    private readonly client;
    private readonly logger;
    constructor(client: Redis, logger: Logger);
    onApplicationShutdown(signal?: string): Promise<void>;
}
