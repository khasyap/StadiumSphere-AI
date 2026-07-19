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
exports.OrganizationApplicationService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const application_repository_interface_1 = require("../interfaces/application-repository.interface");
const crud_application_service_1 = require("./crud-application.service");
let OrganizationApplicationService = class OrganizationApplicationService extends crud_application_service_1.CrudApplicationService {
    constructor(repository) {
        super(repository);
    }
    createEntity(command) {
        return new domain_1.Organization({ name: command.name });
    }
    updateEntity(current, command) {
        return new domain_1.Organization({ name: command.name ?? current.toJSON().name }, current.id);
    }
};
exports.OrganizationApplicationService = OrganizationApplicationService;
exports.OrganizationApplicationService = OrganizationApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(application_repository_interface_1.ORGANIZATION_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], OrganizationApplicationService);
//# sourceMappingURL=organization-application.service.js.map