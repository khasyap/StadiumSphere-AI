"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_health_service_1 = require("./redis.health.service");
describe('RedisHealthService', () => {
    it('reports connected only when the Redis client is ready', () => {
        const client = { status: 'ready' };
        const service = new redis_health_service_1.RedisHealthService(client);
        expect(service.getStatus()).toBe('connected');
        client.status = 'end';
        expect(service.getStatus()).toBe('disconnected');
    });
});
//# sourceMappingURL=redis.health.service.spec.js.map