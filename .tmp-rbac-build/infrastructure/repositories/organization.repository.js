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
exports.OrganizationRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const organization_persistence_mapper_1 = require("../mappers/organization.persistence-mapper");
const organization_schema_1 = require("../schemas/organization.schema");
const mongo_application_repository_1 = require("./mongo-application.repository");
let OrganizationRepository = class OrganizationRepository extends mongo_application_repository_1.MongoApplicationRepository {
    constructor(model) {
        super(model, 'Organization', new organization_persistence_mapper_1.OrganizationPersistenceMapper());
    }
};
exports.OrganizationRepository = OrganizationRepository;
exports.OrganizationRepository = OrganizationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(organization_schema_1.ORGANIZATION_PERSISTENCE_MODEL)),
    __metadata("design:paramtypes", [Function])
], OrganizationRepository);
//# sourceMappingURL=organization.repository.js.map