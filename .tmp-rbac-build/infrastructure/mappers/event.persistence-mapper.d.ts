import { Event } from '../../domain';
import type { EventPersistence } from '../schemas/event.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class EventPersistenceMapper implements PersistenceMapper<Event, EventPersistence> {
    toDomain(document: PersistenceRecord<EventPersistence>): Event;
    toPersistence(entity: Event): Partial<EventPersistence>;
}
