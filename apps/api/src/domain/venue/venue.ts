import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { EntityTimestamps } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { GeoLocation } from '../value-object/geo-location';
import type { TimeSlot } from '../value-object/time-slot';
import { VenueStatus } from './venue-status';

export interface VenueProps {
  location: GeoLocation;
  name: string;
  reservationTimeSlot?: TimeSlot;
  status?: VenueStatus;
}

export class Venue extends AggregateRoot<VenueProps> {
  public constructor(props: VenueProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public get reservationTimeSlot(): TimeSlot | undefined {
    return this.props.reservationTimeSlot;
  }

  public get status(): VenueStatus {
    return this.props.status ?? VenueStatus.AVAILABLE;
  }

  public override toJSON(): Readonly<{
    id: string;
    location: GeoLocation;
    name: string;
    reservationTimeSlot?: TimeSlot;
    status: VenueStatus;
  } & EntityTimestamps> {
    const venue: {
      id: string;
      location: GeoLocation;
      name: string;
      reservationTimeSlot?: TimeSlot;
      status: VenueStatus;
    } & EntityTimestamps = {
      ...this.timestampsToJSON(),
      id: this.id.toString(),
      location: this.props.location,
      name: this.props.name,
      status: this.status,
    };

    if (this.props.reservationTimeSlot !== undefined) {
      venue.reservationTimeSlot = this.props.reservationTimeSlot;
    }

    return Object.freeze(venue);
  }
}
