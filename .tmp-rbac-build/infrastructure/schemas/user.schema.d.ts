import { Schema } from 'mongoose';
import { UserRole } from '../../domain';
export interface UserPersistence {
    email: string;
    passwordHash?: string;
    refreshTokenHash?: string;
    role?: UserRole;
}
export declare const USER_PERSISTENCE_MODEL = "UserPersistence";
export declare const UserPersistenceSchema: Schema<UserPersistence, import("mongoose").Model<UserPersistence, any, any, any, import("mongoose").Document<unknown, any, UserPersistence, any, {}> & UserPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<UserPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
