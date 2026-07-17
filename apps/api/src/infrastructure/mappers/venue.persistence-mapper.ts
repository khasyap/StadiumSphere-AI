import { Address, Coordinates, GeoLocation, UniqueEntityId, Venue } from '../../domain';
import type { VenuePersistence } from '../schemas/venue.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class VenuePersistenceMapper implements PersistenceMapper<Venue, VenuePersistence> {
  public toDomain(document: PersistenceRecord<VenuePersistence>): Venue {
    const { address, latitude, longitude } = document.location;
    const coordinates = new Coordinates(latitude, longitude);
    const location =
      address === undefined
        ? new GeoLocation(coordinates)
        : new GeoLocation(coordinates, new Address(address));

    return new Venue({ location, name: document.name }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: Venue): Partial<VenuePersistence> {
    const venue = entity.toJSON();
    const address = venue.location.address?.toJSON();

    return {
      location:
        address === undefined
          ? {
              latitude: venue.location.coordinates.latitude,
              longitude: venue.location.coordinates.longitude,
            }
          : {
              address,
              latitude: venue.location.coordinates.latitude,
              longitude: venue.location.coordinates.longitude,
            },
      name: venue.name,
    };
  }
}
