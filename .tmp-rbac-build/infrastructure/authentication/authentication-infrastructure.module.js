"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationInfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const authentication_interface_1 = require("../../application/interfaces/authentication.interface");
const bcrypt_password_hasher_1 = require("./bcrypt-password-hasher");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_token_service_1 = require("./jwt-token.service");
let AuthenticationInfrastructureModule = class AuthenticationInfrastructureModule {
};
exports.AuthenticationInfrastructureModule = AuthenticationInfrastructureModule;
exports.AuthenticationInfrastructureModule = AuthenticationInfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), passport_1.PassportModule],
        providers: [
            bcrypt_password_hasher_1.BcryptPasswordHasher,
            jwt_token_service_1.JwtTokenService,
            jwt_strategy_1.JwtStrategy,
            { provide: authentication_interface_1.PASSWORD_HASHER, useExisting: bcrypt_password_hasher_1.BcryptPasswordHasher },
            { provide: authentication_interface_1.AUTHENTICATION_TOKEN_SERVICE, useExisting: jwt_token_service_1.JwtTokenService },
        ],
        exports: [authentication_interface_1.PASSWORD_HASHER, authentication_interface_1.AUTHENTICATION_TOKEN_SERVICE],
    })
], AuthenticationInfrastructureModule);
//# sourceMappingURL=authentication-infrastructure.module.js.map