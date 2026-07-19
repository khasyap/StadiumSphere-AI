"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const stadium_persistence_mapper_1 = require("./stadium.persistence-mapper");
describe('StadiumPersistenceMapper', () => {
    const mapper = new stadium_persistence_mapper_1.StadiumPersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const stadium = mapper.toDomain({ id: 'stadium-1', capacity: 50000, name: 'StadiumSphere Arena' });
        expect(stadium).toBeInstanceOf(domain_1.Stadium);
        expect(stadium.toJSON()).toMatchObject({ id: 'stadium-1', name: 'StadiumSphere Arena' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const stadium = new domain_1.Stadium({ capacity: new domain_1.Capacity(50000), name: 'StadiumSphere Arena' }, new domain_1.UniqueEntityId('stadium-1'));
        expect(mapper.toPersistence(stadium)).toEqual({ capacity: 50000, name: 'StadiumSphere Arena' });
    });
});
//# sourceMappingURL=stadium.persistence-mapper.spec.js.map