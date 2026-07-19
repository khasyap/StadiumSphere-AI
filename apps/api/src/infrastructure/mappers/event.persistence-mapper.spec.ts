import { Event, EventStatus, TimeSlot, UniqueEntityId } from '../../domain';
import { EventPersistenceMapper } from './event.persistence-mapper';

describe('EventPersistenceMapper', () => {
  const mapper = new EventPersistenceMapper();
  const startsAt = new Date('2026-07-18T18:00:00.000Z');
  const endsAt = new Date('2026-07-18T20:00:00.000Z');

  it('maps persistence fields into a domain entity', () => {
    const event = mapper.toDomain({ id: 'event-1', endsAt, name: 'Championship Final', startsAt });

    expect(event).toBeInstanceOf(Event);
    expect(event.toJSON()).toMatchObject({ id: 'event-1', name: 'Championship Final' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const event = new Event(
      { name: 'Championship Final', timeSlot: new TimeSlot(startsAt, endsAt) },
      new UniqueEntityId('event-1'),
    );

    expect(mapper.toPersistence(event)).toEqual({
      endsAt,
      name: 'Championship Final',
      startsAt,
      status: EventStatus.SCHEDULED,
    });
  });
});
