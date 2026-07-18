import { Booking, UniqueEntityId } from '../../domain';
import { BookingPersistenceMapper } from './booking.persistence-mapper';

describe('BookingPersistenceMapper', () => {
  const mapper = new BookingPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const booking = mapper.toDomain({ id: 'booking-1', reference: 'BOOK-2026-0001' });

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.toJSON()).toMatchObject({ id: 'booking-1', reference: 'BOOK-2026-0001' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const booking = new Booking({ reference: 'BOOK-2026-0001' }, new UniqueEntityId('booking-1'));

    expect(mapper.toPersistence(booking)).toEqual({ reference: 'BOOK-2026-0001' });
  });
});
