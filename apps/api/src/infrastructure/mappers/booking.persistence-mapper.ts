import { Booking, BookingStatus, UniqueEntityId } from '../../domain';
import type { BookingPersistence } from '../schemas/booking.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class BookingPersistenceMapper implements PersistenceMapper<Booking, BookingPersistence> {
  public toDomain(document: PersistenceRecord<BookingPersistence>): Booking {
    return new Booking(
      {
        eventId: document.eventId,
        reference: document.reference,
        status: document.status ?? BookingStatus.PENDING,
      },
      new UniqueEntityId(document.id),
    );
  }

  public toPersistence(entity: Booking): Partial<BookingPersistence> {
    const booking = entity.toJSON();
    return { eventId: booking.eventId, reference: booking.reference, status: entity.status };
  }
}
