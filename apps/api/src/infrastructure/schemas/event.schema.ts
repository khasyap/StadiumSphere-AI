import { Schema } from 'mongoose';

import { EventStatus } from '../../domain';

export interface EventPersistence {
  endsAt: Date;
  name: string;
  startsAt: Date;
  status?: EventStatus;
}

export const EVENT_PERSISTENCE_MODEL = 'EventPersistence';

export const EventPersistenceSchema = new Schema<EventPersistence>(
  {
    endsAt: { required: true, type: Date },
    name: { required: true, trim: true, type: String },
    startsAt: { required: true, type: Date },
    status: { default: EventStatus.SCHEDULED, enum: Object.values(EventStatus), required: true, type: String },
  },
  { collection: 'events', timestamps: true },
);

EventPersistenceSchema.index({ startsAt: 1, endsAt: 1 }, { unique: true });
