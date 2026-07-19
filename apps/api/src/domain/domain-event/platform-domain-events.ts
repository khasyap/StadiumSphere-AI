import type { UniqueEntityId } from '../identifier/unique-entity-id';
import type { DomainEvent } from './domain-event';

export type PlatformDomainEventName =
  | 'BookingCancelled'
  | 'BookingCompleted'
  | 'BookingConfirmed'
  | 'BookingCreated'
  | 'EventCancelled'
  | 'EventFinished'
  | 'EventStarted'
  | 'StadiumClosed'
  | 'StadiumOpened'
  | 'VenueReleased'
  | 'VenueReserved';

export function createPlatformDomainEvent(
  name: PlatformDomainEventName,
  aggregateId: UniqueEntityId,
  payload: Readonly<Record<string, unknown>>,
): DomainEvent<Record<string, unknown>> {
  return { aggregateId, name, occurredAt: new Date(), payload };
}
