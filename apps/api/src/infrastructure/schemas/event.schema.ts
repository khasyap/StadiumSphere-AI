import { Schema } from 'mongoose';

export interface EventPersistence {
  endsAt: Date;
  name: string;
  startsAt: Date;
}

export const EVENT_PERSISTENCE_MODEL = 'EventPersistence';

export const EventPersistenceSchema = new Schema<EventPersistence>(
  {
    endsAt: { required: true, type: Date },
    name: { required: true, trim: true, type: String },
    startsAt: { required: true, type: Date },
  },
  { collection: 'events', timestamps: true },
);

EventPersistenceSchema.index({ startsAt: 1 });
