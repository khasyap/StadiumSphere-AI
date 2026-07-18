import { Organization, UniqueEntityId } from '../../domain';
import type { OrganizationRepositoryPort } from '../interfaces/application-repository.interface';
import { OrganizationApplicationService } from './organization-application.service';

describe('OrganizationApplicationService', () => {
  const organization = new Organization(
    { name: 'StadiumSphere Sports' },
    new UniqueEntityId('organization-1'),
  );
  const repository: jest.Mocked<OrganizationRepositoryPort> = {
    create: jest.fn(async (entity: Organization) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [organization]),
    findById: jest.fn(async (_id: UniqueEntityId) => organization),
    update: jest.fn(async (_id: UniqueEntityId, entity: Organization) => entity),
  };
  const service = new OrganizationApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(service.create({ name: 'New Organization' })).resolves.toMatchObject({
      id: expect.any(String),
    });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('organization-1')).resolves.toMatchObject({
      id: 'organization-1',
    });
    await expect(service.update('organization-1', { name: 'Updated Organization' })).resolves.toMatchObject({
      id: 'organization-1',
    });
    await expect(service.delete('organization-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('organization-1'));
  });
});
