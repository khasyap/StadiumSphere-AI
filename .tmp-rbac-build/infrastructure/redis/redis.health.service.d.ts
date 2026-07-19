import type Redis from 'ioredis';
export type RedisConnectionStatus = 'connected' | 'disconnected';
export declare class RedisHealthService {
    private readonly client;
    constructor(client: Redis);
    getStatus(): RedisConnectionStatus;
}
