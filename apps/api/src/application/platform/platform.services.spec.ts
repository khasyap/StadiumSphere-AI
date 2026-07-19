import {
  Booking,
  BookingStatus,
  Event,
  EventStatus,
  Stadium,
  StadiumStatus,
  TimeSlot,
  UniqueEntityId,
  Venue,
  VenueStatus,
} from '../../domain';
import { AuditLogService } from './audit-log.service';
import { DashboardService } from './dashboard.service';
import { DomainEventDispatcherService } from './domain-event-dispatcher.service';
import { InMemoryAiAssistantService } from './ai-assistant.service';
import { InMemoryNotificationProvider } from './notification.service';

describe('platform services', () => {
  it('records in-memory audit entries from domain events', () => {
    const auditLog = new AuditLogService();
    const dispatcher = new DomainEventDispatcherService(auditLog);
    const booking = new Booking(
      { eventId: 'event-1', reference: 'booking-1', status: BookingStatus.CONFIRMED },
      new UniqueEntityId('booking-1'),
    );

    dispatcher.dispatch(booking, {
      aggregateId: booking.id,
      name: 'BookingConfirmed',
      occurredAt: new Date(),
      payload: { status: BookingStatus.CONFIRMED },
    });

    expect(auditLog.recent()).toMatchObject([
      { action: 'BookingConfirmed', entity: 'Booking', entityId: 'booking-1' },
    ]);
    expect(booking.getDomainEvents()).toEqual([]);
  });

  it('aggregates dashboard totals and operational status statistics', async () => {
    const stadium = new Stadium(
      { capacity: { value: 1000 } as never, name: 'Arena', status: StadiumStatus.AVAILABLE },
      new UniqueEntityId('stadium-1'),
    );
    const venue = new Venue(
      { location: {} as never, name: 'Venue', status: VenueStatus.RESERVED },
      new UniqueEntityId('venue-1'),
    );
    const event = new Event(
      {
        name: 'Final',
        status: EventStatus.SCHEDULED,
        timeSlot: new TimeSlot(new Date('2030-01-01T10:00:00.000Z'), new Date('2030-01-01T12:00:00.000Z')),
      },
      new UniqueEntityId('event-1'),
    );
    const booking = new Booking(
      { eventId: 'event-1', reference: 'booking-1', status: BookingStatus.PENDING },
      new UniqueEntityId('booking-1'),
    );
    const repository = (entities: readonly unknown[]) => ({ findAll: jest.fn(async () => entities) });
    const service = new DashboardService(
      repository([{}]) as never,
      repository([{}]) as never,
      repository([stadium]) as never,
      repository([venue]) as never,
      repository([{}]) as never,
      repository([{}]) as never,
      repository([event]) as never,
      repository([booking]) as never,
    );

    await expect(service.getDashboard()).resolves.toMatchObject({
      bookings: { PENDING: 1 },
      events: { SCHEDULED: 1 },
      stadiumAvailability: 100,
      totals: { bookings: 1, events: 1, stadiums: 1, venues: 1 },
      upcomingEvents: 1,
      venueUtilization: 100,
    });
  });

  it('provides local notification and AI abstraction adapters without external calls', async () => {
    const notifications = new InMemoryNotificationProvider();
    const ai = new InMemoryAiAssistantService();

    await notifications.send({ recipient: 'user-1', subject: 'Update', text: 'Confirmed' });
    await expect(ai.recommend('event-1')).resolves.toEqual([]);
    await expect(ai.summarize(' Summary ')).resolves.toBe('Summary');
    expect(notifications.delivered()).toHaveLength(1);
  });
});
