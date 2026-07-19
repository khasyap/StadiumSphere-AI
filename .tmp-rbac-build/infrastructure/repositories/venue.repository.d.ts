import type { Model } from 'mongoose';
import type { VenueRepositoryPort } from '../../application';
import type { Venue } from '../../domain';
import type { VenuePersistence } from '../schemas/venue.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class VenueRepository extends MongoApplicationRepository<Venue, VenuePersistence> implements VenueRepositoryPort {
    constructor(model: Model<VenuePersistence>);
}
