import { Schema } from 'mongoose';

export interface TeamPersistence {
  name: string;
  sportId: string;
  sportName: string;
}

export const TEAM_PERSISTENCE_MODEL = 'TeamPersistence';

export const TeamPersistenceSchema = new Schema<TeamPersistence>(
  {
    name: { required: true, trim: true, type: String },
    sportId: { index: true, required: true, type: String },
    sportName: { required: true, trim: true, type: String },
  },
  { collection: 'teams', timestamps: true },
);

TeamPersistenceSchema.index({ name: 1, sportId: 1 }, { unique: true });
