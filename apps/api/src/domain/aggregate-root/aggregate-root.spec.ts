import type { DomainEvent } from '../domain-event/domain-event';
import { UniqueEntityId } from '../identifier/unique-entity-id';
import { AggregateRoot } from './aggregate-root';

class TestAggregate extends AggregateRoot<{ name: string }> {
  public constructor(props: { name: string }, id?: UniqueEntityId) {
    super(props, id);
  }

  public record(event: DomainEvent): void {
    this.addDomainEvent(event);
  }
}

describe('AggregateRoot', () => {
  it('collects and clears domain events without publishing them', () => {
    const aggregate = new TestAggregate({ name: 'Venue' }, new UniqueEntityId('aggregate-id'));
    const event: DomainEvent<{ name: string }> = {
      aggregateId: aggregate.id,
      name: 'venue.created',
      occurredAt: new Date('2026-01-01T00:00:00.000Z'),
      payload: { name: 'Venue' },
    };

    aggregate.record(event);

    expect(aggregate.getDomainEvents()).toEqual([event]);
    expect(aggregate.getDomainEvents()).not.toBe(aggregate.getDomainEvents());

    aggregate.clearDomainEvents();

    expect(aggregate.getDomainEvents()).toEqual([]);
  });
});
