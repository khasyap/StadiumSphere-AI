import { Schema } from 'mongoose';

import { BookingStatus } from '../../domain';

export interface BookingPersistence {
  eventId: string;
  reference: string;
  status?: BookingStatus;
}

export const BOOKING_PERSISTENCE_MODEL = 'BookingPersistence';

export const BookingPersistenceSchema = new Schema<BookingPersistence>(
  {
    eventId: { required: true, trim: true, type: String },
    reference: { required: true, trim: true, type: String },
    status: { default: BookingStatus.PENDING, enum: Object.values(BookingStatus), required: true, type: String },
  },
  { collection: 'bookings', timestamps: true },
);

BookingPersistenceSchema.index({ reference: 1 }, { unique: true });
BookingPersistenceSchema.index({ eventId: 1 });
