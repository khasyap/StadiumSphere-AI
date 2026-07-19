"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const database_health_service_1 = require("../../infrastructure/database/database.health.service");
const redis_health_service_1 = require("../../infrastructure/redis/redis.health.service");
let HealthService = class HealthService {
    databaseHealthService;
    redisHealthService;
    constructor(databaseHealthService, redisHealthService) {
        this.databaseHealthService = databaseHealthService;
        this.redisHealthService = redisHealthService;
    }
    getHealth() {
        const database = this.databaseHealthService.getStatus();
        const redis = this.redisHealthService.getStatus();
        return {
            database,
            redis,
            service: 'api',
            status: database === 'connected' && redis === 'connected' ? 'ok' : 'degraded',
            timestamp: new Date().toISOString(),
            version: '0.1.0',
        };
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_health_service_1.DatabaseHealthService)),
    __param(1, (0, common_1.Inject)(redis_health_service_1.RedisHealthService)),
    __metadata("design:paramtypes", [database_health_service_1.DatabaseHealthService,
        redis_health_service_1.RedisHealthService])
], HealthService);
//# sourceMappingURL=health.service.js.map