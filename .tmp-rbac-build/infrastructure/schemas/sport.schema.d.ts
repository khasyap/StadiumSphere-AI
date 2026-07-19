import { Schema } from 'mongoose';
export interface SportPersistence {
    name: string;
}
export declare const SPORT_PERSISTENCE_MODEL = "SportPersistence";
export declare const SportPersistenceSchema: Schema<SportPersistence, import("mongoose").Model<SportPersistence, any, any, any, import("mongoose").Document<unknown, any, SportPersistence, any, {}> & SportPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SportPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SportPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<SportPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
