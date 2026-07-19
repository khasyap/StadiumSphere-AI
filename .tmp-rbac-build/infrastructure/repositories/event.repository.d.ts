import type { Model } from 'mongoose';
import type { EventRepositoryPort } from '../../application';
import type { Event, TimeSlot } from '../../domain';
import type { EventPersistence } from '../schemas/event.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class EventRepository extends MongoApplicationRepository<Event, EventPersistence> implements EventRepositoryPort {
    constructor(model: Model<EventPersistence>);
    existsByTimeSlot(timeSlot: TimeSlot): Promise<boolean>;
}
