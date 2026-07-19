import type { Model } from 'mongoose';
import type { UserRepositoryPort } from '../../application';
import type { Email, User } from '../../domain';
import type { UserPersistence } from '../schemas/user.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class UserRepository extends MongoApplicationRepository<User, UserPersistence> implements UserRepositoryPort {
    constructor(model: Model<UserPersistence>);
    findByEmail(email: Email): Promise<User | null>;
}
