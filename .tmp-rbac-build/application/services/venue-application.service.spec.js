"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const venue_application_service_1 = require("./venue-application.service");
describe('VenueApplicationService', () => {
    const venue = new domain_1.Venue({
        location: new domain_1.GeoLocation(new domain_1.Coordinates(13.0827, 80.2707), new domain_1.Address({ city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' })),
        name: 'StadiumSphere Arena',
    }, new domain_1.UniqueEntityId('venue-1'));
    const repository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [venue]),
        findById: jest.fn(async (_id) => venue),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new venue_application_service_1.VenueApplicationService(repository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('coordinates create, read, update, and delete through its repository port', async () => {
        await expect(service.create({
            addressLine1: '1 Stadium Way',
            city: 'Chennai',
            country: 'India',
            latitude: 13.0827,
            longitude: 80.2707,
            name: 'New Venue',
            postalCode: '600001',
        })).resolves.toMatchObject({ id: expect.any(String) });
        await expect(service.findAll()).resolves.toHaveLength(1);
        await expect(service.findById('venue-1')).resolves.toMatchObject({ id: 'venue-1' });
        await expect(service.update('venue-1', { latitude: 12.9716, name: 'Updated Venue' })).resolves.toMatchObject({
            id: 'venue-1',
        });
        await expect(service.delete('venue-1')).resolves.toBeUndefined();
        expect(repository.create).toHaveBeenCalledTimes(1);
        expect(repository.update).toHaveBeenCalledTimes(1);
        expect(repository.delete).toHaveBeenCalledWith(new domain_1.UniqueEntityId('venue-1'));
    });
});
//# sourceMappingURL=venue-application.service.spec.js.map