import type { Model } from 'mongoose';
import type { SportRepositoryPort } from '../../application';
import type { Sport } from '../../domain';
import type { SportPersistence } from '../schemas/sport.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class SportRepository extends MongoApplicationRepository<Sport, SportPersistence> implements SportRepositoryPort {
    constructor(model: Model<SportPersistence>);
}
