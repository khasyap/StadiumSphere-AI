import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { TimeSlot } from '../value-object/time-slot';
import { EventStatus } from './event-status';

export interface EventProps {
  name: string;
  status?: EventStatus;
  timeSlot: TimeSlot;
}

export class Event extends AggregateRoot<EventProps> {
  public constructor(props: EventProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public get status(): EventStatus {
    return this.props.status ?? EventStatus.SCHEDULED;
  }

  public override toJSON(): Readonly<{
    id: string;
    name: string;
    status: EventStatus;
    timeSlot: TimeSlot;
  }> {
    return Object.freeze({
      id: this.id.toString(),
      name: this.props.name,
      status: this.status,
      timeSlot: this.props.timeSlot,
    });
  }
}
