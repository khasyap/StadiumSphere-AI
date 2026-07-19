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
exports.JwtTokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let JwtTokenService = class JwtTokenService {
    configuration;
    jwtService;
    constructor(configuration, jwtService) {
        this.configuration = configuration;
        this.jwtService = jwtService;
    }
    createAccessToken(payload) {
        return this.jwtService.signAsync({ ...payload, tokenType: 'access' }, {
            expiresIn: this.configuration.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
            secret: this.configuration.getOrThrow('JWT_ACCESS_SECRET'),
        });
    }
    createRefreshToken(payload) {
        return this.jwtService.signAsync({ ...payload, tokenType: 'refresh' }, {
            expiresIn: this.configuration.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
            secret: this.configuration.getOrThrow('JWT_REFRESH_SECRET'),
        });
    }
    verifyRefreshToken(token) {
        return this.jwtService.verifyAsync(token, {
            secret: this.configuration.getOrThrow('JWT_REFRESH_SECRET'),
        });
    }
};
exports.JwtTokenService = JwtTokenService;
exports.JwtTokenService = JwtTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.ConfigService)),
    __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], JwtTokenService);
//# sourceMappingURL=jwt-token.service.js.map