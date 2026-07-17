import type { UniqueEntityId } from '../identifier/unique-entity-id';

export interface DomainEvent<TPayload extends object = object> {
  readonly aggregateId: UniqueEntityId;
  readonly name: string;
  readonly occurredAt: Date;
  readonly payload: Readonly<TPayload>;
}
