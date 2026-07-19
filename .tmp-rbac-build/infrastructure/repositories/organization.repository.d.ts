import type { Model } from 'mongoose';
import type { OrganizationRepositoryPort } from '../../application';
import type { Organization } from '../../domain';
import type { OrganizationPersistence } from '../schemas/organization.schema';
import { MongoApplicationRepository } from './mongo-application.repository';
export declare class OrganizationRepository extends MongoApplicationRepository<Organization, OrganizationPersistence> implements OrganizationRepositoryPort {
    constructor(model: Model<OrganizationPersistence>);
}
