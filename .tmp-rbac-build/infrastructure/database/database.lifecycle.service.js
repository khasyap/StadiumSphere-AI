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
exports.DatabaseLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const nestjs_pino_1 = require("nestjs-pino");
const mongoose_2 = require("mongoose");
let DatabaseLifecycleService = class DatabaseLifecycleService {
    connection;
    logger;
    constructor(connection, logger) {
        this.connection = connection;
        this.logger = logger;
    }
    async onApplicationShutdown(signal) {
        if (this.connection.readyState === mongoose_2.ConnectionStates.disconnected) {
            return;
        }
        this.logger.log({ signal: signal ?? 'application' }, 'MongoDB disconnecting');
        await this.connection.close();
        this.logger.log('MongoDB disconnected');
    }
};
exports.DatabaseLifecycleService = DatabaseLifecycleService;
exports.DatabaseLifecycleService = DatabaseLifecycleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function, nestjs_pino_1.Logger])
], DatabaseLifecycleService);
//# sourceMappingURL=database.lifecycle.service.js.map