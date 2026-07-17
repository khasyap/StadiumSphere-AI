import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { GeoLocation } from '../value-object/geo-location';

export interface VenueProps {
  name: string;
  location: GeoLocation;
}

export class Venue extends AggregateRoot<VenueProps> {
  public constructor(props: VenueProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
