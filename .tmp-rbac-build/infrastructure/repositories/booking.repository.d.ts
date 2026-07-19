import type { Model } from 'mongoose';
import type { BookingRepositoryPort } from '../../application';
import type { Booking } from '../../domain';
import type { BookingPersistence } from '../schemas/booking.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class BookingRepository extends MongoApplicationRepository<Booking, BookingPersistence> implements BookingRepositoryPort {
    constructor(model: Model<BookingPersistence>);
}
