import { Address, Coordinates, GeoLocation, UniqueEntityId, Venue } from '../../domain';
import type { VenueRepositoryPort } from '../interfaces/application-repository.interface';
import { VenueApplicationService } from './venue-application.service';

describe('VenueApplicationService', () => {
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
  const repository: jest.Mocked<VenueRepositoryPort> = {
    create: jest.fn(async (entity: Venue) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [venue]),
    findById: jest.fn(async (_id: UniqueEntityId) => venue),
    update: jest.fn(async (_id: UniqueEntityId, entity: Venue) => entity),
  };
  const service = new VenueApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(
      service.create({
        addressLine1: '1 Stadium Way',
        city: 'Chennai',
        country: 'India',
        latitude: 13.0827,
        longitude: 80.2707,
        name: 'New Venue',
        postalCode: '600001',
      }),
    ).resolves.toMatchObject({ id: expect.any(String) });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('venue-1')).resolves.toMatchObject({ id: 'venue-1' });
    await expect(service.update('venue-1', { latitude: 12.9716, name: 'Updated Venue' })).resolves.toMatchObject({
      id: 'venue-1',
    });
    await expect(service.delete('venue-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('venue-1'));
  });
});
