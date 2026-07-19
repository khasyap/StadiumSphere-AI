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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_1 = require("../../application");
const authentication_dto_1 = require("../dto/authentication.dto");
const success_response_1 = require("../responses/success.response");
let AuthenticationController = class AuthenticationController {
    authenticationService;
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    async login(dto) {
        return new success_response_1.SuccessResponse('Authentication successful.', await this.authenticationService.login(dto));
    }
    async refresh(dto) {
        return new success_response_1.SuccessResponse('Token refresh successful.', await this.authenticationService.refresh(dto.refreshToken));
    }
    async logout(dto) {
        await this.authenticationService.logout(dto.refreshToken);
        return new success_response_1.SuccessResponse('Logout successful.', undefined);
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Authenticate with email and password' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Authentication successful.', type: authentication_dto_1.AuthenticationTokensResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid credentials.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authentication_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Rotate a refresh token' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Token refresh successful.', type: authentication_dto_1.AuthenticationTokensResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid refresh token.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authentication_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Invalidate the active refresh token' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Logout successful.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid refresh token.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authentication_dto_1.LogoutDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "logout", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(application_1.AUTHENTICATION_APPLICATION_SERVICE)),
    __metadata("design:paramtypes", [application_1.AuthenticationApplicationService])
], AuthenticationController);
//# sourceMappingURL=authentication.controller.js.map