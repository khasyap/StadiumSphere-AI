import type { Model } from 'mongoose';

import { Address, Coordinates, GeoLocation, UniqueEntityId, Venue, VenueStatus } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { VenuePersistence } from '../schemas/venue.schema';
import { VenueRepository } from './venue.repository';

const venue = new Venue(
  {
    location: new GeoLocation(
      new Coordinates(13.0827, 80.2707),
      new Address({ city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' }),
    ),
    name: 'StadiumSphere Arena',
  },
  new UniqueEntityId('venue-1'),
);
const document = {
  id: 'venue-1',
  location: {
    address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
    latitude: 13.0827,
    longitude: 80.2707,
  },
  name: 'StadiumSphere Arena',
};

const createModel = (): Model<VenuePersistence> => {
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
  } as unknown as Model<VenuePersistence>;
};

describe('VenueRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new VenueRepository(model);

    await expect(repository.create(venue)).resolves.toBeInstanceOf(Venue);
    await expect(repository.findById(new UniqueEntityId('venue-1'))).resolves.toBeInstanceOf(Venue);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('venue-1'), venue)).resolves.toBeInstanceOf(Venue);
    await expect(repository.delete(new UniqueEntityId('venue-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({
      location: {
        address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
        latitude: 13.0827,
        longitude: 80.2707,
      },
      name: 'StadiumSphere Arena',
      status: VenueStatus.AVAILABLE,
    });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      'venue-1',
      {
        $set: {
          location: {
            address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
            latitude: 13.0827,
            longitude: 80.2707,
          },
          name: 'StadiumSphere Arena',
          status: VenueStatus.AVAILABLE,
        },
      },
      { new: true, runValidators: true },
    );
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new VenueRepository(model).create(venue)).rejects.toBeInstanceOf(DuplicateEntityException);
  });
});
