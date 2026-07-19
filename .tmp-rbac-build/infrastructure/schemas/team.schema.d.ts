import { Schema } from 'mongoose';
export interface TeamPersistence {
    name: string;
    sportId: string;
    sportName: string;
}
export declare const TEAM_PERSISTENCE_MODEL = "TeamPersistence";
export declare const TeamPersistenceSchema: Schema<TeamPersistence, import("mongoose").Model<TeamPersistence, any, any, any, import("mongoose").Document<unknown, any, TeamPersistence, any, {}> & TeamPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TeamPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<TeamPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
