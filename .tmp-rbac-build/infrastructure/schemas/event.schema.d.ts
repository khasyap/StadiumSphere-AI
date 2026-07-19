import { Schema } from 'mongoose';
import { EventStatus } from '../../domain';
export interface EventPersistence {
    endsAt: Date;
    name: string;
    startsAt: Date;
    status?: EventStatus;
}
export declare const EVENT_PERSISTENCE_MODEL = "EventPersistence";
export declare const EventPersistenceSchema: Schema<EventPersistence, import("mongoose").Model<EventPersistence, any, any, any, import("mongoose").Document<unknown, any, EventPersistence, any, {}> & EventPersistence & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventPersistence, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<EventPersistence>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<EventPersistence> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
