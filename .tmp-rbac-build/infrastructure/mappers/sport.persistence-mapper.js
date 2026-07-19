"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class SportPersistenceMapper {
    toDomain(document) {
        return new domain_1.Sport({ name: document.name }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        return { name: entity.toJSON().name };
    }
}
exports.SportPersistenceMapper = SportPersistenceMapper;
//# sourceMappingURL=sport.persistence-mapper.js.map