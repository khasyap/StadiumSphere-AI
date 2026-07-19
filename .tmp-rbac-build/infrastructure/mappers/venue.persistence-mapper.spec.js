"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const venue_persistence_mapper_1 = require("./venue.persistence-mapper");
describe('VenuePersistenceMapper', () => {
    const mapper = new venue_persistence_mapper_1.VenuePersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const venue = mapper.toDomain({
            id: 'venue-1',
            location: {
                address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
                latitude: 13.0827,
                longitude: 80.2707,
            },
            name: 'StadiumSphere Arena',
        });
        expect(venue).toBeInstanceOf(domain_1.Venue);
        expect(venue.toJSON()).toMatchObject({ id: 'venue-1', name: 'StadiumSphere Arena' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const venue = new domain_1.Venue({
            location: new domain_1.GeoLocation(new domain_1.Coordinates(13.0827, 80.2707), new domain_1.Address({ city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' })),
            name: 'StadiumSphere Arena',
        }, new domain_1.UniqueEntityId('venue-1'));
        expect(mapper.toPersistence(venue)).toEqual({
            location: {
                address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
                latitude: 13.0827,
                longitude: 80.2707,
            },
            name: 'StadiumSphere Arena',
        });
    });
});
//# sourceMappingURL=venue.persistence-mapper.spec.js.map