"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_service_1 = require("./health.service");
describe('HealthService', () => {
    it('reports ok when MongoDB and Redis are connected', () => {
        const databaseHealthService = {
            getStatus: jest.fn().mockReturnValue('connected'),
        };
        const redisHealthService = {
            getStatus: jest.fn().mockReturnValue('connected'),
        };
        const service = new health_service_1.HealthService(databaseHealthService, redisHealthService);
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
        };
        const redisHealthService = {
            getStatus: jest.fn().mockReturnValue('connected'),
        };
        const service = new health_service_1.HealthService(databaseHealthService, redisHealthService);
        expect(service.getHealth()).toMatchObject({
            database: 'disconnected',
            redis: 'connected',
            status: 'degraded',
        });
    });
});
//# sourceMappingURL=health.service.spec.js.map