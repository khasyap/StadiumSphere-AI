import {
  Address,
  Coordinates,
  GeoLocation,
  TimeSlot,
  UniqueEntityId,
  Venue,
  VenueStatus,
} from '../../domain';
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

    const props = {
      location,
      name: document.name,
      status: document.status ?? VenueStatus.AVAILABLE,
    };

    if (document.reservationStartsAt !== undefined && document.reservationEndsAt !== undefined) {
      return new Venue(
        {
          ...props,
          reservationTimeSlot: new TimeSlot(document.reservationStartsAt, document.reservationEndsAt),
        },
        new UniqueEntityId(document.id),
      );
    }

    return new Venue(props, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: Venue): Partial<VenuePersistence> {
    const venue = entity.toJSON();
    const address = venue.location.address?.toJSON();

    const persistence: Partial<VenuePersistence> = {
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
      status: venue.status,
    };

    if (venue.reservationTimeSlot !== undefined) {
      persistence.reservationEndsAt = venue.reservationTimeSlot.endsAt;
      persistence.reservationStartsAt = venue.reservationTimeSlot.startsAt;
    }

    return persistence;
  }
}
