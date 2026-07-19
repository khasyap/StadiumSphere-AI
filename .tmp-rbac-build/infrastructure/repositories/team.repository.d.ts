import type { Model } from 'mongoose';
import type { TeamRepositoryPort } from '../../application';
import type { Team, UniqueEntityId } from '../../domain';
import type { TeamPersistence } from '../schemas/team.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class TeamRepository extends MongoApplicationRepository<Team, TeamPersistence> implements TeamRepositoryPort {
    constructor(model: Model<TeamPersistence>);
    existsBySportId(sportId: UniqueEntityId): Promise<boolean>;
}
