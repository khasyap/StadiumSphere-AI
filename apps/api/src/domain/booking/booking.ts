import { AggregateRoot } from '../aggregate-root/aggregate-root';
import { UniqueEntityId } from '../identifier/unique-entity-id';
import { BookingStatus } from './booking-status';

export interface BookingProps {
  eventId: string;
  reference: string;
  status?: BookingStatus;
}

export class Booking extends AggregateRoot<BookingProps> {
  public constructor(props: BookingProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public get eventId(): UniqueEntityId {
    return new UniqueEntityId(this.props.eventId);
  }

  public get status(): BookingStatus {
    return this.props.status ?? BookingStatus.PENDING;
  }
}
