"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudApplicationService = void 0;
const domain_1 = require("../../domain");
const application_entity_not_found_exception_1 = require("../exceptions/application-entity-not-found.exception");
class CrudApplicationService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(command) {
        return this.toResponse(await this.repository.create(this.createEntity(command)));
    }
    async delete(id) {
        await this.repository.delete(new domain_1.UniqueEntityId(id));
    }
    async findAll() {
        return (await this.repository.findAll()).map((entity) => this.toResponse(entity));
    }
    async findById(id) {
        return this.toResponse(await this.getEntity(id));
    }
    async update(id, command) {
        const entity = await this.getEntity(id);
        return this.toResponse(await this.repository.update(new domain_1.UniqueEntityId(id), this.updateEntity(entity, command)));
    }
    async getEntity(id) {
        const entity = await this.repository.findById(new domain_1.UniqueEntityId(id));
        if (entity === null) {
            throw new application_entity_not_found_exception_1.ApplicationEntityNotFoundException(id);
        }
        return entity;
    }
    toResponse(entity) {
        return entity.toJSON();
    }
}
exports.CrudApplicationService = CrudApplicationService;
//# sourceMappingURL=crud-application.service.js.map