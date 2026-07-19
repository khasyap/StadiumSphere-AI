import { Schema } from 'mongoose';

import { VenueStatus } from '../../domain';

export interface VenueAddressPersistence {
  city: string;
  country: string;
  line1: string;
  postalCode: string;
}

export interface VenuePersistence {
  location: {
    address?: VenueAddressPersistence;
    latitude: number;
    longitude: number;
  };
  name: string;
  reservationEndsAt?: Date;
  reservationStartsAt?: Date;
  status?: VenueStatus;
}

export const VENUE_PERSISTENCE_MODEL = 'VenuePersistence';

export const VenuePersistenceSchema = new Schema<VenuePersistence>(
  {
    location: {
      address: {
        city: { type: String },
        country: { type: String },
        line1: { type: String },
        postalCode: { type: String },
      },
      latitude: { required: true, type: Number },
      longitude: { required: true, type: Number },
    },
    name: { required: true, trim: true, type: String },
    reservationEndsAt: { type: Date },
    reservationStartsAt: { type: Date },
    status: { default: VenueStatus.AVAILABLE, enum: Object.values(VenueStatus), required: true, type: String },
  },
  { collection: 'venues', timestamps: true },
);

VenuePersistenceSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
