"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const sport_persistence_mapper_1 = require("./sport.persistence-mapper");
describe('SportPersistenceMapper', () => {
    const mapper = new sport_persistence_mapper_1.SportPersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const sport = mapper.toDomain({ id: 'sport-1', name: 'Football' });
        expect(sport).toBeInstanceOf(domain_1.Sport);
        expect(sport.toJSON()).toMatchObject({ id: 'sport-1', name: 'Football' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const sport = new domain_1.Sport({ name: 'Football' }, new domain_1.UniqueEntityId('sport-1'));
        expect(mapper.toPersistence(sport)).toEqual({ name: 'Football' });
    });
});
//# sourceMappingURL=sport.persistence-mapper.spec.js.map