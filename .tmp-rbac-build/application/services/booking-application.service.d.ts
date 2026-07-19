import { Booking } from '../../domain';
import type { BookingRepositoryPort, EventRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
export interface BookingCreateCommand {
    eventId: string;
    reference: string;
}
export interface BookingUpdateCommand {
    eventId?: string;
    reference?: string;
}
export declare class BookingApplicationService extends CrudApplicationService<Booking, BookingCreateCommand, BookingUpdateCommand> {
    private readonly bookingRepository;
    private readonly eventRepository;
    constructor(bookingRepository: BookingRepositoryPort, eventRepository: EventRepositoryPort);
    create(command: BookingCreateCommand): Promise<Record<string, unknown>>;
    update(id: string, command: BookingUpdateCommand): Promise<Record<string, unknown>>;
    confirm(id: string): Promise<Record<string, unknown>>;
    cancel(id: string): Promise<Record<string, unknown>>;
    checkIn(id: string): Promise<Record<string, unknown>>;
    complete(id: string): Promise<Record<string, unknown>>;
    protected createEntity(command: BookingCreateCommand): Booking;
    protected updateEntity(current: Booking, command: BookingUpdateCommand): Booking;
    private ensureBookableEvent;
    private ensureTransition;
    private getBooking;
    private persistStatus;
    private toWorkflowResponse;
    private withProperties;
}
