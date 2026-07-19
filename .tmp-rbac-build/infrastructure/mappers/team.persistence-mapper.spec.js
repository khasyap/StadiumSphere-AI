"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const team_persistence_mapper_1 = require("./team.persistence-mapper");
describe('TeamPersistenceMapper', () => {
    const mapper = new team_persistence_mapper_1.TeamPersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const team = mapper.toDomain({
            id: 'team-1',
            name: 'StadiumSphere FC',
            sportId: 'sport-1',
            sportName: 'Football',
        });
        expect(team).toBeInstanceOf(domain_1.Team);
        expect(team.toJSON()).toMatchObject({ id: 'team-1', name: 'StadiumSphere FC' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const team = new domain_1.Team({ name: 'StadiumSphere FC', sport: new domain_1.Sport({ name: 'Football' }, new domain_1.UniqueEntityId('sport-1')) }, new domain_1.UniqueEntityId('team-1'));
        expect(mapper.toPersistence(team)).toEqual({
            name: 'StadiumSphere FC',
            sportId: 'sport-1',
            sportName: 'Football',
        });
    });
});
//# sourceMappingURL=team.persistence-mapper.spec.js.map