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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const nestjs_pino_1 = require("nestjs-pino");
const pino_1 = __importDefault(require("pino"));
const health_module_1 = require("./common/health/health.module");
const correlation_id_middleware_1 = require("./common/middleware/correlation-id.middleware");
const environment_validation_1 = require("./config/environment.validation");
const database_module_1 = require("./infrastructure/database/database.module");
const redis_module_1 = require("./infrastructure/redis/redis.module");
const presentation_module_1 = require("./presentation/presentation.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(correlation_id_middleware_1.CorrelationIdMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: environment_validation_1.validateEnvironment,
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    logger: (0, pino_1.default)({
                        level: (process.env.LOG_LEVEL ?? 'info'),
                        redact: ['req.headers.authorization', 'req.headers.cookie'],
                    }),
                },
            }),
            database_module_1.DatabaseModule,
            redis_module_1.RedisModule,
            presentation_module_1.PresentationModule,
            throttler_1.ThrottlerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configuration) => [
                    {
                        limit: configuration.getOrThrow('RATE_LIMIT_MAX'),
                        ttl: configuration.getOrThrow('RATE_LIMIT_TTL_MS'),
                    },
                ],
            }),
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map