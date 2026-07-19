import { Schema } from 'mongoose';
export interface OrganizationPersistence {
    name: string;
}
export declare const ORGANIZATION_PERSISTENCE_MODEL = "OrganizationPersistence";
export declare const OrganizationPersistenceSchema: Schema<OrganizationPersistence, import("mongoose").Model<OrganizationPersistence, any, any, any, import("mongoose").Document<unknown, any, OrganizationPersistence, any, {}> & OrganizationPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrganizationPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OrganizationPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<OrganizationPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
