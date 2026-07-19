"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityApplicationService = void 0;
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
class EntityApplicationService {
    repository;
    mapper;
    constructor(repository, mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }
    async findAll() {
        const entities = await this.repository.findAll();
        return entities.map((entity) => this.mapper.toDto(entity));
    }
    async findById(id) {
        const entity = await this.repository.findById(new domain_1.UniqueEntityId(id));
        if (entity === null) {
            throw new application_entity_not_found_exception_1.ApplicationEntityNotFoundException(id);
        }
        return this.mapper.toDto(entity);
    }
}
exports.EntityApplicationService = EntityApplicationService;
//# sourceMappingURL=entity-application.service.js.map