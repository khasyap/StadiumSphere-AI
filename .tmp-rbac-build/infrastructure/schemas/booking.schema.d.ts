import { Schema } from 'mongoose';
import { BookingStatus } from '../../domain';
export interface BookingPersistence {
    eventId: string;
    reference: string;
    status?: BookingStatus;
}
export declare const BOOKING_PERSISTENCE_MODEL = "BookingPersistence";
export declare const BookingPersistenceSchema: Schema<BookingPersistence, import("mongoose").Model<BookingPersistence, any, any, any, import("mongoose").Document<unknown, any, BookingPersistence, any, {}> & BookingPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BookingPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BookingPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<BookingPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
