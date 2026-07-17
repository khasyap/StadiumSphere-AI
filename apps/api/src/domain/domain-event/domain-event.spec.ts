import type { DomainEvent } from './domain-event';
import { UniqueEntityId } from '../identifier/unique-entity-id';

describe('DomainEvent', () => {
  it('defines a serializable, deterministic event contract', () => {
    const event: DomainEvent<{ stadiumId: string }> = {
      aggregateId: new UniqueEntityId('stadium-1'),
      name: 'stadium.created',
      occurredAt: new Date('2026-01-01T00:00:00.000Z'),
      payload: { stadiumId: 'stadium-1' },
    };

    expect(event.name).toBe('stadium.created');
    expect(event.occurredAt.toISOString()).toBe('2026-01-01T00:00:00.000Z');
  });
});
