import {
  Address,
  Coordinates,
  GeoLocation,
  TimeSlot,
  UniqueEntityId,
  Venue,
  VenueStatus,
} from '../../domain';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { VenueRepositoryPort } from '../interfaces/application-repository.interface';
import { VenueApplicationService } from './venue-application.service';
import { AuditLogService } from '../platform/audit-log.service';
import { DomainEventDispatcherService } from '../platform/domain-event-dispatcher.service';

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
  const service = new VenueApplicationService(
    repository,
    new DomainEventDispatcherService(new AuditLogService()),
  );

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

  it('reserves and releases an available venue through the repository port', async () => {
    repository.findById
      .mockResolvedValueOnce(venue)
      .mockResolvedValueOnce(
        new Venue(
          {
            location: venue.toJSON().location,
            name: 'StadiumSphere Arena',
            reservationTimeSlot: new TimeSlot(
              new Date('2026-07-20T18:00:00.000Z'),
              new Date('2026-07-20T20:00:00.000Z'),
            ),
            status: VenueStatus.RESERVED,
          },
          new UniqueEntityId('venue-1'),
        ),
      );

    await expect(
      service.reserve('venue-1', new Date('2026-07-20T18:00:00.000Z'), new Date('2026-07-20T20:00:00.000Z')),
    ).resolves.toMatchObject({ status: VenueStatus.RESERVED });
    await expect(service.release('venue-1')).resolves.toMatchObject({ status: VenueStatus.AVAILABLE });

    expect(repository.update).toHaveBeenCalledTimes(2);
  });

  it('rejects a reservation against a closed venue', async () => {
    repository.findById.mockResolvedValueOnce(
      new Venue(
        {
          location: venue.toJSON().location,
          name: 'StadiumSphere Arena',
          status: VenueStatus.CLOSED,
        },
        new UniqueEntityId('venue-1'),
      ),
    );

    await expect(
      service.reserve('venue-1', new Date('2026-07-20T18:00:00.000Z'), new Date('2026-07-20T20:00:00.000Z')),
    ).rejects.toBeInstanceOf(ApplicationValidationException);
  });

  it('rejects a duplicate active reservation', async () => {
    repository.findById.mockResolvedValueOnce(
      new Venue(
        {
          location: venue.toJSON().location,
          name: 'StadiumSphere Arena',
          status: VenueStatus.RESERVED,
        },
        new UniqueEntityId('venue-1'),
      ),
    );

    await expect(
      service.reserve('venue-1', new Date('2026-07-20T18:00:00.000Z'), new Date('2026-07-20T20:00:00.000Z')),
    ).rejects.toBeInstanceOf(ApplicationValidationException);
  });
});
