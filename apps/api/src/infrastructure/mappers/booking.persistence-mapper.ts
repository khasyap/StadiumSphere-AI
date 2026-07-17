import { Booking, UniqueEntityId } from '../../domain';
import type { BookingPersistence } from '../schemas/booking.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class BookingPersistenceMapper implements PersistenceMapper<Booking, BookingPersistence> {
  public toDomain(document: PersistenceRecord<BookingPersistence>): Booking {
    return new Booking({ reference: document.reference }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: Booking): Partial<BookingPersistence> {
    return { reference: entity.toJSON().reference };
  }
}
