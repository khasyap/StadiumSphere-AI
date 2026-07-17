import type { DomainEvent } from '../domain-event/domain-event';
import { Entity } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';

export abstract class AggregateRoot<TProps extends object> extends Entity<TProps> {
  private readonly domainEvents: DomainEvent[] = [];

  protected constructor(props: Readonly<TProps>, id?: UniqueEntityId) {
    super(props, id);
  }

  public addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public clearDomainEvents(): void {
    this.domainEvents.splice(0, this.domainEvents.length);
  }

  public getDomainEvents(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }
}
