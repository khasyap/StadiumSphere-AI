import { Schema } from 'mongoose';

export interface OrganizationPersistence {
  name: string;
}

export const ORGANIZATION_PERSISTENCE_MODEL = 'OrganizationPersistence';

export const OrganizationPersistenceSchema = new Schema<OrganizationPersistence>(
  {
    name: { required: true, trim: true, type: String },
  },
  { collection: 'organizations', timestamps: true },
);

OrganizationPersistenceSchema.index({ name: 1 }, { unique: true });
