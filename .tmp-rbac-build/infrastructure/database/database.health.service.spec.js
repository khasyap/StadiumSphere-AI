"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_health_service_1 = require("./database.health.service");
describe('DatabaseHealthService', () => {
    it('reports connected only when the MongoDB connection is ready', () => {
        const connectedService = new database_health_service_1.DatabaseHealthService({
            readyState: mongoose_1.ConnectionStates.connected,
        });
        const disconnectedService = new database_health_service_1.DatabaseHealthService({
            readyState: mongoose_1.ConnectionStates.disconnected,
        });
        expect(connectedService.getStatus()).toBe('connected');
        expect(disconnectedService.getStatus()).toBe('disconnected');
    });
});
//# sourceMappingURL=database.health.service.spec.js.map