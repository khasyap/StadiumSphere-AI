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
exports.StadiumController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_1 = require("../../application");
const domain_1 = require("../../domain");
const roles_decorator_1 = require("../decorators/roles.decorator");
const stadium_dto_1 = require("../dto/stadium.dto");
const jwt_authentication_guard_1 = require("../guards/jwt-authentication.guard");
const roles_guard_1 = require("../guards/roles.guard");
const resource_controller_1 = require("./resource.controller");
let StadiumController = class StadiumController extends resource_controller_1.ResourceController {
    constructor(service) {
        super(service, 'Stadium');
    }
    list() {
        return this.listResources();
    }
    getById(id) {
        return this.getResource(id);
    }
    create(dto) {
        return this.createResource(dto);
    }
    update(id, dto) {
        return this.updateResource(id, dto);
    }
    delete(id) {
        return this.deleteResource(id);
    }
};
exports.StadiumController = StadiumController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER, domain_1.UserRole.STAFF, domain_1.UserRole.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List stadiums (authenticated)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stadiums retrieved.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StadiumController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a stadium' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stadium retrieved.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StadiumController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a stadium (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Stadium created.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stadium_dto_1.CreateStadiumDto]),
    __metadata("design:returntype", Promise)
], StadiumController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a stadium' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stadium updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, stadium_dto_1.UpdateStadiumDto]),
    __metadata("design:returntype", Promise)
], StadiumController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a stadium (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stadium deleted.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StadiumController.prototype, "delete", null);
exports.StadiumController = StadiumController = __decorate([
    (0, swagger_1.ApiTags)('Stadiums'),
    (0, common_1.Controller)('stadiums'),
    __param(0, (0, common_1.Inject)(application_1.STADIUM_APPLICATION_SERVICE)),
    __metadata("design:paramtypes", [Object])
], StadiumController);
//# sourceMappingURL=stadium.controller.js.map