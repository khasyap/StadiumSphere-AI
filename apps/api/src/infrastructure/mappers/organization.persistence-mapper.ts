import { Organization, UniqueEntityId } from '../../domain';
import type { OrganizationPersistence } from '../schemas/organization.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class OrganizationPersistenceMapper implements PersistenceMapper<
  Organization,
  OrganizationPersistence
> {
  public toDomain(document: PersistenceRecord<OrganizationPersistence>): Organization {
    return new Organization({ name: document.name }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: Organization): Partial<OrganizationPersistence> {
    return { name: entity.toJSON().name };
  }
}
