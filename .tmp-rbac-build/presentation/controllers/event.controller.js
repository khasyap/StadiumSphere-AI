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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_1 = require("../../application");
const domain_1 = require("../../domain");
const roles_decorator_1 = require("../decorators/roles.decorator");
const event_dto_1 = require("../dto/event.dto");
const jwt_authentication_guard_1 = require("../guards/jwt-authentication.guard");
const roles_guard_1 = require("../guards/roles.guard");
const success_response_1 = require("../responses/success.response");
const resource_controller_1 = require("./resource.controller");
let EventController = class EventController extends resource_controller_1.ResourceController {
    workflowService;
    constructor(workflowService) {
        super(workflowService, 'Event');
        this.workflowService = workflowService;
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
    async start(id) {
        return new success_response_1.SuccessResponse('Event started.', await this.workflowService.start(id));
    }
    async finish(id) {
        return new success_response_1.SuccessResponse('Event finished.', await this.workflowService.finish(id));
    }
    async cancel(id) {
        return new success_response_1.SuccessResponse('Event cancelled.', await this.workflowService.cancel(id));
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List events' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Events retrieved.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event retrieved.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create an event' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Event created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Start an event (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event started.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':id/finish'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Finish an event (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event finished.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "finish", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel an event (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event cancelled.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "cancel", null);
exports.EventController = EventController = __decorate([
    (0, swagger_1.ApiTags)('Events'),
    (0, common_1.Controller)('events'),
    __param(0, (0, common_1.Inject)(application_1.EVENT_APPLICATION_SERVICE)),
    __metadata("design:paramtypes", [Object])
], EventController);
//# sourceMappingURL=event.controller.js.map