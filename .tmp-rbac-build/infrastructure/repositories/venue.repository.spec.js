"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const venue_repository_1 = require("./venue.repository");
const venue = new domain_1.Venue({
    location: new domain_1.GeoLocation(new domain_1.Coordinates(13.0827, 80.2707), new domain_1.Address({ city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' })),
    name: 'StadiumSphere Arena',
}, new domain_1.UniqueEntityId('venue-1'));
const document = {
    id: 'venue-1',
    location: {
        address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
        latitude: 13.0827,
        longitude: 80.2707,
    },
    name: 'StadiumSphere Arena',
};
const createModel = () => {
    const collectionQuery = {
        exec: jest.fn().mockResolvedValue([document]),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
    };
    return {
        countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
        create: jest.fn().mockResolvedValue(document),
        find: jest.fn().mockReturnValue(collectionQuery),
        findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
        findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    };
};
describe('VenueRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new venue_repository_1.VenueRepository(model);
        await expect(repository.create(venue)).resolves.toBeInstanceOf(domain_1.Venue);
        await expect(repository.findById(new domain_1.UniqueEntityId('venue-1'))).resolves.toBeInstanceOf(domain_1.Venue);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('venue-1'), venue)).resolves.toBeInstanceOf(domain_1.Venue);
        await expect(repository.delete(new domain_1.UniqueEntityId('venue-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({
            location: {
                address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
                latitude: 13.0827,
                longitude: 80.2707,
            },
            name: 'StadiumSphere Arena',
        });
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith('venue-1', {
            $set: {
                location: {
                    address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
                    latitude: 13.0827,
                    longitude: 80.2707,
                },
                name: 'StadiumSphere Arena',
            },
        }, { new: true, runValidators: true });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new venue_repository_1.VenueRepository(model).create(venue)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=venue.repository.spec.js.map