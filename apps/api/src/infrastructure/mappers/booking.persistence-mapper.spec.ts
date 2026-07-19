import { Booking, BookingStatus, UniqueEntityId } from '../../domain';
import { BookingPersistenceMapper } from './booking.persistence-mapper';

describe('BookingPersistenceMapper', () => {
  const mapper = new BookingPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const booking = mapper.toDomain({
      eventId: 'event-1',
      id: 'booking-1',
      reference: 'BOOK-2026-0001',
    });

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.toJSON()).toMatchObject({ id: 'booking-1', reference: 'BOOK-2026-0001' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const booking = new Booking(
      { eventId: 'event-1', reference: 'BOOK-2026-0001', status: BookingStatus.PENDING },
      new UniqueEntityId('booking-1'),
    );

    expect(mapper.toPersistence(booking)).toEqual({
      eventId: 'event-1',
      reference: 'BOOK-2026-0001',
      status: BookingStatus.PENDING,
    });
  });
});
