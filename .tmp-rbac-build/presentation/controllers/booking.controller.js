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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_1 = require("../../application");
const domain_1 = require("../../domain");
const roles_decorator_1 = require("../decorators/roles.decorator");
const booking_dto_1 = require("../dto/booking.dto");
const jwt_authentication_guard_1 = require("../guards/jwt-authentication.guard");
const roles_guard_1 = require("../guards/roles.guard");
const success_response_1 = require("../responses/success.response");
const resource_controller_1 = require("./resource.controller");
let BookingController = class BookingController extends resource_controller_1.ResourceController {
    workflowService;
    constructor(workflowService) {
        super(workflowService, 'Booking');
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
    async confirm(id) {
        return new success_response_1.SuccessResponse('Booking confirmed.', await this.workflowService.confirm(id));
    }
    async cancel(id) {
        return new success_response_1.SuccessResponse('Booking cancelled.', await this.workflowService.cancel(id));
    }
    async checkIn(id) {
        return new success_response_1.SuccessResponse('Booking checked in.', await this.workflowService.checkIn(id));
    }
    async complete(id) {
        return new success_response_1.SuccessResponse('Booking completed.', await this.workflowService.complete(id));
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List bookings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bookings retrieved.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a booking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking retrieved.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a booking' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Booking created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a booking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking updated.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, booking_dto_1.UpdateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a booking placeholder' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking deleted.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/confirm'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm a booking (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking confirmed.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a booking (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking cancelled.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancel", null);
__decorate([
    (0, common_1.Post)(':id/check-in'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER, domain_1.UserRole.STAFF),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check in a booking (Staff, Manager, or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking checked in.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Staff, Manager, or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, common_1.UseGuards)(jwt_authentication_guard_1.JwtAuthenticationGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(domain_1.UserRole.ADMIN, domain_1.UserRole.MANAGER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Complete a booking (Manager or Admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking completed.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Manager or Admin role is required.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'A valid access token is required.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "complete", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiTags)('Bookings'),
    (0, common_1.Controller)('bookings'),
    __param(0, (0, common_1.Inject)(application_1.BOOKING_APPLICATION_SERVICE)),
    __metadata("design:paramtypes", [Object])
], BookingController);
//# sourceMappingURL=booking.controller.js.map