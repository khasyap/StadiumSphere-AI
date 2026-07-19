import { Organization } from '../../domain';
import type { OrganizationPersistence } from '../schemas/organization.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class OrganizationPersistenceMapper implements PersistenceMapper<Organization, OrganizationPersistence> {
    toDomain(document: PersistenceRecord<OrganizationPersistence>): Organization;
    toPersistence(entity: Organization): Partial<OrganizationPersistence>;
}
