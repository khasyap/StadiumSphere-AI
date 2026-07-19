import { Schema } from 'mongoose';
export interface VenueAddressPersistence {
    city: string;
    country: string;
    line1: string;
    postalCode: string;
}
export interface VenuePersistence {
    location: {
        address?: VenueAddressPersistence;
        latitude: number;
        longitude: number;
    };
    name: string;
}
export declare const VENUE_PERSISTENCE_MODEL = "VenuePersistence";
export declare const VenuePersistenceSchema: Schema<VenuePersistence, import("mongoose").Model<VenuePersistence, any, any, any, import("mongoose").Document<unknown, any, VenuePersistence, any, {}> & VenuePersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VenuePersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VenuePersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<VenuePersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
