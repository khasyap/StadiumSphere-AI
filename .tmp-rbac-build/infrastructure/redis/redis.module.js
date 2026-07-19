"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = __importDefault(require("ioredis"));
const nestjs_pino_1 = require("nestjs-pino");
const redis_constants_1 = require("./redis.constants");
const redis_health_service_1 = require("./redis.health.service");
const redis_lifecycle_service_1 = require("./redis.lifecycle.service");
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: redis_constants_1.REDIS_CLIENT,
                inject: [config_1.ConfigService, nestjs_pino_1.Logger],
                useFactory: (configuration, logger) => {
                    const password = configuration.get('REDIS_PASSWORD');
                    const options = {
                        host: configuration.getOrThrow('REDIS_HOST'),
                        lazyConnect: true,
                        port: configuration.getOrThrow('REDIS_PORT'),
                    };
                    if (password !== undefined) {
                        options.password = password;
                    }
                    const client = new ioredis_1.default(options);
                    let reconnectAttempts = 0;
                    client.on('connect', () => {
                        reconnectAttempts = 0;
                        logger.log('Redis connected');
                    });
                    client.on('close', () => {
                        logger.warn('Redis disconnected');
                    });
                    client.on('reconnecting', (delay) => {
                        reconnectAttempts += 1;
                        logger.warn({ attempt: reconnectAttempts, delay }, 'Redis retry attempt');
                    });
                    client.on('error', (error) => {
                        logger.error({ err: error }, 'Redis connection failure');
                    });
                    void client.connect().catch((error) => {
                        logger.error({ err: error }, 'Redis startup connection failure');
                    });
                    return client;
                },
            },
            redis_health_service_1.RedisHealthService,
            redis_lifecycle_service_1.RedisLifecycleService,
        ],
        exports: [redis_constants_1.REDIS_CLIENT, redis_health_service_1.RedisHealthService],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map