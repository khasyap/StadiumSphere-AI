"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class OrganizationPersistenceMapper {
    toDomain(document) {
        return new domain_1.Organization({ name: document.name }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        return { name: entity.toJSON().name };
    }
}
exports.OrganizationPersistenceMapper = OrganizationPersistenceMapper;
//# sourceMappingURL=organization.persistence-mapper.js.map