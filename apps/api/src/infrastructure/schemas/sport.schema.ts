import { Schema } from 'mongoose';

export interface SportPersistence {
  name: string;
}

export const SPORT_PERSISTENCE_MODEL = 'SportPersistence';

export const SportPersistenceSchema = new Schema<SportPersistence>(
  {
    name: { required: true, trim: true, type: String },
  },
  { collection: 'sports', timestamps: true },
);

SportPersistenceSchema.index({ name: 1 }, { unique: true });
