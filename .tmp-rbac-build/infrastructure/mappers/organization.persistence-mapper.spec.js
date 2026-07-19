"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const organization_persistence_mapper_1 = require("./organization.persistence-mapper");
describe('OrganizationPersistenceMapper', () => {
    const mapper = new organization_persistence_mapper_1.OrganizationPersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const organization = mapper.toDomain({ id: 'organization-1', name: 'StadiumSphere Sports' });
        expect(organization).toBeInstanceOf(domain_1.Organization);
        expect(organization.toJSON()).toMatchObject({ id: 'organization-1' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const organization = new domain_1.Organization({ name: 'StadiumSphere Sports' }, new domain_1.UniqueEntityId('organization-1'));
        expect(mapper.toPersistence(organization)).toEqual({ name: 'StadiumSphere Sports' });
    });
});
//# sourceMappingURL=organization.persistence-mapper.spec.js.map