import type { DomainEvent } from '../domain-event/domain-event';

export interface DomainEventAware {
  clearDomainEvents(): void;
  getDomainEvents(): readonly DomainEvent[];
}
