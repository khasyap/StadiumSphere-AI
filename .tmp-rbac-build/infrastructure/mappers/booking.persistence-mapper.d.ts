import { Booking } from '../../domain';
import type { BookingPersistence } from '../schemas/booking.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class BookingPersistenceMapper implements PersistenceMapper<Booking, BookingPersistence> {
    toDomain(document: PersistenceRecord<BookingPersistence>): Booking;
    toPersistence(entity: Booking): Partial<BookingPersistence>;
}
