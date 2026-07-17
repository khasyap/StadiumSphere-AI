import { Schema } from 'mongoose';

export interface StadiumPersistence {
  capacity: number;
  name: string;
}

export const STADIUM_PERSISTENCE_MODEL = 'StadiumPersistence';

export const StadiumPersistenceSchema = new Schema<StadiumPersistence>(
  {
    capacity: { required: true, type: Number },
    name: { required: true, trim: true, type: String },
  },
  { collection: 'stadiums', timestamps: true },
);

StadiumPersistenceSchema.index({ name: 1 });
