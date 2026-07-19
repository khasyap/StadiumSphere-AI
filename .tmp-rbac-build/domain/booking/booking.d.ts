import { AggregateRoot } from '../aggregate-root/aggregate-root';
import { UniqueEntityId } from '../identifier/unique-entity-id';
import { BookingStatus } from './booking-status';
export interface BookingProps {
    eventId: string;
    reference: string;
    status?: BookingStatus;
}
export declare class Booking extends AggregateRoot<BookingProps> {
    constructor(props: BookingProps, id?: UniqueEntityId);
    get eventId(): UniqueEntityId;
    get status(): BookingStatus;
}
