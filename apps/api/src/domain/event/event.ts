import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { TimeSlot } from '../value-object/time-slot';

export interface EventProps {
  name: string;
  timeSlot: TimeSlot;
}

export class Event extends AggregateRoot<EventProps> {
  public constructor(props: EventProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
