import { Schema } from 'mongoose';

export interface BookingPersistence {
  reference: string;
}

export const BOOKING_PERSISTENCE_MODEL = 'BookingPersistence';

export const BookingPersistenceSchema = new Schema<BookingPersistence>(
  {
    reference: { required: true, trim: true, type: String },
  },
  { collection: 'bookings', timestamps: true },
);

BookingPersistenceSchema.index({ reference: 1 }, { unique: true });
