"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_pino_1 = require("nestjs-pino");
const database_health_service_1 = require("./database.health.service");
const database_lifecycle_service_1 = require("./database.lifecycle.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService, nestjs_pino_1.Logger],
                useFactory: (configuration, logger) => {
                    const databaseName = configuration.getOrThrow('MONGODB_DATABASE');
                    let connectionAttempts = 0;
                    return {
                        uri: configuration.getOrThrow('MONGODB_URI'),
                        lazyConnection: true,
                        dbName: databaseName,
                        serverSelectionTimeoutMS: configuration.getOrThrow('MONGODB_SERVER_SELECTION_TIMEOUT_MS'),
                        connectionFactory: (connection) => {
                            connection.on('connecting', () => {
                                connectionAttempts += 1;
                                logger.log({ attempt: connectionAttempts, database: databaseName }, 'MongoDB connecting');
                            });
                            connection.on('connected', () => {
                                connectionAttempts = 0;
                                logger.log({ database: databaseName }, 'MongoDB connected');
                            });
                            connection.on('disconnected', () => {
                                logger.warn('MongoDB disconnected');
                            });
                            connection.on('reconnected', () => {
                                logger.log({ database: databaseName }, 'MongoDB reconnected');
                            });
                            connection.on('reconnectFailed', () => {
                                logger.error('MongoDB reconnection failed');
                            });
                            connection.on('error', (error) => {
                                logger.error({ err: error }, 'MongoDB connection failure');
                            });
                            return connection;
                        },
                    };
                },
            }),
        ],
        providers: [database_health_service_1.DatabaseHealthService, database_lifecycle_service_1.DatabaseLifecycleService],
        exports: [database_health_service_1.DatabaseHealthService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map