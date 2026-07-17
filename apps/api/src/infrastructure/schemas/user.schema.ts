import { Schema } from 'mongoose';

export interface UserPersistence {
  email: string;
}

export const USER_PERSISTENCE_MODEL = 'UserPersistence';

export const UserPersistenceSchema = new Schema<UserPersistence>(
  {
    email: { required: true, trim: true, type: String },
  },
  { collection: 'users', timestamps: true },
);

UserPersistenceSchema.index({ email: 1 }, { unique: true });
