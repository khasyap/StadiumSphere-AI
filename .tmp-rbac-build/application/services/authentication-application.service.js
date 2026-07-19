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
exports.AuthenticationApplicationService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const invalid_credentials_exception_1 = require("../exceptions/invalid-credentials.exception");
const invalid_refresh_token_exception_1 = require("../exceptions/invalid-refresh-token.exception");
const authentication_interface_1 = require("../interfaces/authentication.interface");
const application_repository_interface_1 = require("../interfaces/application-repository.interface");
let AuthenticationApplicationService = class AuthenticationApplicationService {
    userRepository;
    passwordHasher;
    tokenService;
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
    }
    async login(command) {
        const user = await this.userRepository.findByEmail(new domain_1.Email(command.email));
        if (user === null || user.passwordHash === undefined) {
            throw new invalid_credentials_exception_1.InvalidCredentialsException();
        }
        if (!(await this.passwordHasher.verify(command.password, user.passwordHash))) {
            throw new invalid_credentials_exception_1.InvalidCredentialsException();
        }
        return this.issueTokens(user);
    }
    async logout(refreshToken) {
        const user = await this.getRefreshTokenUser(refreshToken);
        await this.persistRefreshTokenHash(user, undefined);
    }
    async refresh(refreshToken) {
        const user = await this.getRefreshTokenUser(refreshToken);
        return this.issueTokens(user);
    }
    async getRefreshTokenUser(refreshToken) {
        let payload;
        try {
            payload = await this.tokenService.verifyRefreshToken(refreshToken);
        }
        catch {
            throw new invalid_refresh_token_exception_1.InvalidRefreshTokenException();
        }
        if (payload.tokenType !== 'refresh') {
            throw new invalid_refresh_token_exception_1.InvalidRefreshTokenException();
        }
        const user = await this.userRepository.findById(new domain_1.UniqueEntityId(payload.sub));
        if (user === null ||
            user.refreshTokenHash === undefined ||
            !(await this.passwordHasher.verify(refreshToken, user.refreshTokenHash))) {
            throw new invalid_refresh_token_exception_1.InvalidRefreshTokenException();
        }
        return user;
    }
    async issueTokens(user) {
        const userJson = user.toJSON();
        const payload = { email: userJson.email.value, role: user.role, sub: userJson.id };
        const [accessToken, refreshToken] = await Promise.all([
            this.tokenService.createAccessToken(payload),
            this.tokenService.createRefreshToken(payload),
        ]);
        await this.persistRefreshTokenHash(user, await this.passwordHasher.hash(refreshToken));
        return { accessToken, refreshToken };
    }
    async persistRefreshTokenHash(user, refreshTokenHash) {
        const userJson = user.toJSON();
        const properties = { email: userJson.email };
        properties.role = user.role;
        if (user.passwordHash !== undefined) {
            properties.passwordHash = user.passwordHash;
        }
        if (refreshTokenHash !== undefined) {
            properties.refreshTokenHash = refreshTokenHash;
        }
        await this.userRepository.update(user.id, new domain_1.User(properties, user.id));
    }
};
exports.AuthenticationApplicationService = AuthenticationApplicationService;
exports.AuthenticationApplicationService = AuthenticationApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(application_repository_interface_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(authentication_interface_1.PASSWORD_HASHER)),
    __param(2, (0, common_1.Inject)(authentication_interface_1.AUTHENTICATION_TOKEN_SERVICE)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticationApplicationService);
//# sourceMappingURL=authentication-application.service.js.map