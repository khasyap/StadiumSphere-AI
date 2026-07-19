import type { DomainEvent } from '../domain-event/domain-event';
import { Entity } from '../entity/entity';
import type { UniqueEntityId } from '../identifier/unique-entity-id';
export declare abstract class AggregateRoot<TProps extends object> extends Entity<TProps> {
    private readonly domainEvents;
    protected constructor(props: Readonly<TProps>, id?: UniqueEntityId);
    addDomainEvent(event: DomainEvent): void;
    clearDomainEvents(): void;
    getDomainEvents(): readonly DomainEvent[];
}
