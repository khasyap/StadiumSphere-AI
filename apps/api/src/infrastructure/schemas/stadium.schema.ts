import { Schema } from 'mongoose';

import { StadiumStatus } from '../../domain';

export interface StadiumPersistence {
  capacity: number;
  name: string;
  status?: StadiumStatus;
}

export const STADIUM_PERSISTENCE_MODEL = 'StadiumPersistence';

export const StadiumPersistenceSchema = new Schema<StadiumPersistence>(
  {
    capacity: { required: true, type: Number },
    name: { required: true, trim: true, type: String },
    status: { default: StadiumStatus.AVAILABLE, enum: Object.values(StadiumStatus), required: true, type: String },
  },
  { collection: 'stadiums', timestamps: true },
);

StadiumPersistenceSchema.index({ name: 1 });
