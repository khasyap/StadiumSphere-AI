import { Address, Coordinates, GeoLocation, UniqueEntityId, Venue, VenueStatus } from '../../domain';
import { VenuePersistenceMapper } from './venue.persistence-mapper';

describe('VenuePersistenceMapper', () => {
  const mapper = new VenuePersistenceMapper();

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

    expect(venue).toBeInstanceOf(Venue);
    expect(venue.toJSON()).toMatchObject({
      id: 'venue-1',
      name: 'StadiumSphere Arena',
      status: VenueStatus.AVAILABLE,
    });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
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

    expect(mapper.toPersistence(venue)).toEqual({
      location: {
        address: { city: 'Chennai', country: 'India', line1: '1 Stadium Way', postalCode: '600001' },
        latitude: 13.0827,
        longitude: 80.2707,
      },
      name: 'StadiumSphere Arena',
      status: VenueStatus.AVAILABLE,
    });
  });
});
