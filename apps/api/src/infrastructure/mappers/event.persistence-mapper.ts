import { Event, TimeSlot, UniqueEntityId } from '../../domain';
import type { EventPersistence } from '../schemas/event.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class EventPersistenceMapper implements PersistenceMapper<Event, EventPersistence> {
  public toDomain(document: PersistenceRecord<EventPersistence>): Event {
    return new Event(
      { name: document.name, timeSlot: new TimeSlot(document.startsAt, document.endsAt) },
      new UniqueEntityId(document.id),
    );
  }

  public toPersistence(entity: Event): Partial<EventPersistence> {
    const event = entity.toJSON();
    return {
      endsAt: event.timeSlot.endsAt,
      name: event.name,
      startsAt: event.timeSlot.startsAt,
    };
  }
}
