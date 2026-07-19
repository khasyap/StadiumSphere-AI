"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StadiumPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class StadiumPersistenceMapper {
    toDomain(document) {
        return new domain_1.Stadium({ capacity: new domain_1.Capacity(document.capacity), name: document.name }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        const stadium = entity.toJSON();
        return { capacity: stadium.capacity.value, name: stadium.name };
    }
}
exports.StadiumPersistenceMapper = StadiumPersistenceMapper;
//# sourceMappingURL=stadium.persistence-mapper.js.map