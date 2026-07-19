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
exports.StadiumApplicationService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const application_repository_interface_1 = require("../interfaces/application-repository.interface");
const crud_application_service_1 = require("./crud-application.service");
let StadiumApplicationService = class StadiumApplicationService extends crud_application_service_1.CrudApplicationService {
    constructor(repository) {
        super(repository);
    }
    createEntity(command) {
        return new domain_1.Stadium({ capacity: new domain_1.Capacity(command.capacity), name: command.name });
    }
    updateEntity(current, command) {
        const stadium = current.toJSON();
        return new domain_1.Stadium({
            capacity: new domain_1.Capacity(command.capacity ?? stadium.capacity.value),
            name: command.name ?? stadium.name,
        }, current.id);
    }
};
exports.StadiumApplicationService = StadiumApplicationService;
exports.StadiumApplicationService = StadiumApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(application_repository_interface_1.STADIUM_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], StadiumApplicationService);
//# sourceMappingURL=stadium-application.service.js.map