import { AggregateRoot } from '../aggregate-root/aggregate-root';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { TimeSlot } from '../value-object/time-slot';
import { EventStatus } from './event-status';
export interface EventProps {
    name: string;
    status?: EventStatus;
    timeSlot: TimeSlot;
}
export declare class Event extends AggregateRoot<EventProps> {
    constructor(props: EventProps, id?: UniqueEntityId);
    get status(): EventStatus;
    toJSON(): Readonly<{
        id: string;
        name: string;
        status: EventStatus;
        timeSlot: TimeSlot;
    }>;
}
