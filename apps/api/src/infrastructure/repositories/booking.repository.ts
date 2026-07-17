import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';

import type { BookingRepositoryPort } from '../../application';
import type { Booking } from '../../domain';
import { BookingPersistenceMapper } from '../mappers/booking.persistence-mapper';
import { BOOKING_PERSISTENCE_MODEL } from '../schemas/booking.schema';
import type { BookingPersistence } from '../schemas/booking.schema';
import { MongoApplicationRepository } from './mongo-application.repository';

@Injectable()
export class BookingRepository
  extends MongoApplicationRepository<Booking, BookingPersistence>
  implements BookingRepositoryPort
{
  public constructor(@InjectModel(BOOKING_PERSISTENCE_MODEL) model: Model<BookingPersistence>) {
    super(model, 'Booking', new BookingPersistenceMapper());
  }
}
