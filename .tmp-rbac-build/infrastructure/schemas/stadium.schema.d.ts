import { Schema } from 'mongoose';
export interface StadiumPersistence {
    capacity: number;
    name: string;
}
export declare const STADIUM_PERSISTENCE_MODEL = "StadiumPersistence";
export declare const StadiumPersistenceSchema: Schema<StadiumPersistence, import("mongoose").Model<StadiumPersistence, any, any, any, import("mongoose").Document<unknown, any, StadiumPersistence, any, {}> & StadiumPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StadiumPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StadiumPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<StadiumPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
