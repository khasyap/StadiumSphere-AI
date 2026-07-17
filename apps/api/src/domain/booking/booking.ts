import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';

export interface BookingProps {
  reference: string;
}

export class Booking extends AggregateRoot<BookingProps> {
  public constructor(props: BookingProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
