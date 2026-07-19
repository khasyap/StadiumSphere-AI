import type { Model } from 'mongoose';
import type { StadiumRepositoryPort } from '../../application';
import type { Stadium } from '../../domain';
import type { StadiumPersistence } from '../schemas/stadium.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class StadiumRepository extends MongoApplicationRepository<Stadium, StadiumPersistence> implements StadiumRepositoryPort {
    constructor(model: Model<StadiumPersistence>);
}
