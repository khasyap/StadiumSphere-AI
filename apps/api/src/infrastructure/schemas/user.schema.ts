import { Schema } from 'mongoose';

import { UserRole } from '../../domain';

export interface UserPersistence {
  email: string;
  passwordHash?: string;
  refreshTokenHash?: string;
  role?: UserRole;
}

export const USER_PERSISTENCE_MODEL = 'UserPersistence';

export const UserPersistenceSchema = new Schema<UserPersistence>(
  {
    email: { required: true, trim: true, type: String },
    passwordHash: { type: String },
    refreshTokenHash: { type: String },
    role: { default: UserRole.USER, enum: Object.values(UserRole), required: true, type: String },
  },
  { collection: 'users', timestamps: true },
);

UserPersistenceSchema.index({ email: 1 }, { unique: true });
