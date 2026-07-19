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
exports.StadiumRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const stadium_persistence_mapper_1 = require("../mappers/stadium.persistence-mapper");
const stadium_schema_1 = require("../schemas/stadium.schema");
const mongo_application_repository_1 = require("./mongo-application.repository");
let StadiumRepository = class StadiumRepository extends mongo_application_repository_1.MongoApplicationRepository {
    constructor(model) {
        super(model, 'Stadium', new stadium_persistence_mapper_1.StadiumPersistenceMapper());
    }
};
exports.StadiumRepository = StadiumRepository;
exports.StadiumRepository = StadiumRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stadium_schema_1.STADIUM_PERSISTENCE_MODEL)),
    __metadata("design:paramtypes", [Function])
], StadiumRepository);
//# sourceMappingURL=stadium.repository.js.map