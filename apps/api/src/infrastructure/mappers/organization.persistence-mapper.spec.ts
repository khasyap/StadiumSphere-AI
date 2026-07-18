import { Organization, UniqueEntityId } from '../../domain';
import { OrganizationPersistenceMapper } from './organization.persistence-mapper';

describe('OrganizationPersistenceMapper', () => {
  const mapper = new OrganizationPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const organization = mapper.toDomain({ id: 'organization-1', name: 'StadiumSphere Sports' });

    expect(organization).toBeInstanceOf(Organization);
    expect(organization.toJSON()).toMatchObject({ id: 'organization-1' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const organization = new Organization(
      { name: 'StadiumSphere Sports' },
      new UniqueEntityId('organization-1'),
    );

    expect(mapper.toPersistence(organization)).toEqual({ name: 'StadiumSphere Sports' });
  });
});
