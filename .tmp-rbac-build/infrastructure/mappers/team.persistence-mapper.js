"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class TeamPersistenceMapper {
    toDomain(document) {
        const sport = new domain_1.Sport({ name: document.sportName }, new domain_1.UniqueEntityId(document.sportId));
        return new domain_1.Team({ name: document.name, sport }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        const team = entity.toJSON();
        const sport = team.sport.toJSON();
        return { name: team.name, sportId: sport.id, sportName: sport.name };
    }
}
exports.TeamPersistenceMapper = TeamPersistenceMapper;
//# sourceMappingURL=team.persistence-mapper.js.map