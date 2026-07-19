import { Booking, BookingStatus, Event, EventStatus, TimeSlot, UniqueEntityId } from '../../domain';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type {
  BookingRepositoryPort,
  EventRepositoryPort,
} from '../interfaces/application-repository.interface';
import { BookingApplicationService } from './booking-application.service';

describe('BookingApplicationService', () => {
  const event = new Event(
    {
      name: 'Championship Final',
      status: EventStatus.SCHEDULED,
      timeSlot: new TimeSlot(new Date('2030-07-18T18:00:00.000Z'), new Date('2030-07-18T20:00:00.000Z')),
    },
    new UniqueEntityId('event-1'),
  );
  const pendingBooking = new Booking(
    { eventId: 'event-1', reference: 'BOOK-2026-0001', status: BookingStatus.PENDING },
    new UniqueEntityId('booking-1'),
  );
  const bookingRepository: jest.Mocked<BookingRepositoryPort> = {
    create: jest.fn(async (entity: Booking) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [pendingBooking]),
    findById: jest.fn(async (_id: UniqueEntityId) => pendingBooking),
    update: jest.fn(async (_id: UniqueEntityId, entity: Booking) => entity),
  };
  const eventRepository: jest.Mocked<EventRepositoryPort> = {
    create: jest.fn(async (entity: Event) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    existsByTimeSlot: jest.fn(async (_timeSlot: TimeSlot) => false),
    findAll: jest.fn(async () => [event]),
    findById: jest.fn(async (_id: UniqueEntityId) => event),
    update: jest.fn(async (_id: UniqueEntityId, entity: Event) => entity),
  };
  const service = new BookingApplicationService(bookingRepository, eventRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates pending bookings only for an existing bookable event', async () => {
    await expect(service.create({ eventId: 'event-1', reference: 'BOOK-2026-0002' })).resolves.toMatchObject({
      eventId: 'event-1',
      status: BookingStatus.PENDING,
    });
    expect(eventRepository.findById).toHaveBeenCalledWith(new UniqueEntityId('event-1'));
  });

  it('enforces the pending, confirmed, checked-in, and completed lifecycle', async () => {
    await expect(service.confirm('booking-1')).resolves.toMatchObject({ status: BookingStatus.CONFIRMED });
    expect(bookingRepository.update).toHaveBeenCalledWith(
      new UniqueEntityId('booking-1'),
      expect.objectContaining({ status: BookingStatus.CONFIRMED }),
    );

    await expect(service.checkIn('booking-1')).rejects.toBeInstanceOf(ApplicationValidationException);
  });

  it('rejects confirmation for cancelled events and completed booking updates', async () => {
    eventRepository.findById.mockResolvedValueOnce(
      new Event(
        { name: 'Cancelled', status: EventStatus.CANCELLED, timeSlot: event.toJSON().timeSlot },
        event.id,
      ),
    );
    await expect(service.confirm('booking-1')).rejects.toBeInstanceOf(ApplicationValidationException);

    bookingRepository.findById.mockResolvedValueOnce(
      new Booking(
        { eventId: 'event-1', reference: 'BOOK-2026-0001', status: BookingStatus.COMPLETED },
        pendingBooking.id,
      ),
    );
    await expect(service.update('booking-1', { reference: 'changed' })).rejects.toBeInstanceOf(
      ApplicationValidationException,
    );
  });
});
