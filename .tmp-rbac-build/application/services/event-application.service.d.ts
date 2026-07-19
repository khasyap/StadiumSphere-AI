import { Event } from '../../domain';
import type { EventRepositoryPort } from '../interfaces/application-repository.interface';
import { CrudApplicationService } from './crud-application.service';
export interface EventCreateCommand {
    endsAt: Date;
    name: string;
    startsAt: Date;
}
export interface EventUpdateCommand {
    endsAt?: Date;
    name?: string;
    startsAt?: Date;
}
export declare class EventApplicationService extends CrudApplicationService<Event, EventCreateCommand, EventUpdateCommand> {
    private readonly eventRepository;
    constructor(eventRepository: EventRepositoryPort);
    create(command: EventCreateCommand): Promise<Record<string, unknown>>;
    update(id: string, command: EventUpdateCommand): Promise<Record<string, unknown>>;
    start(id: string): Promise<Record<string, unknown>>;
    finish(id: string): Promise<Record<string, unknown>>;
    cancel(id: string): Promise<Record<string, unknown>>;
    protected createEntity(command: EventCreateCommand): Event;
    protected updateEntity(current: Event, command: EventUpdateCommand): Event;
    private createTimeSlot;
    private ensureScheduleAvailable;
    private getEvent;
    private transition;
}
