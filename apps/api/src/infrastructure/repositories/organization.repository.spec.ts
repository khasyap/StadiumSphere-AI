import type { Model } from 'mongoose';

import { Organization, UniqueEntityId } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { OrganizationPersistence } from '../schemas/organization.schema';
import { OrganizationRepository } from './organization.repository';

const organization = new Organization(
  { name: 'StadiumSphere Sports' },
  new UniqueEntityId('organization-1'),
);
const document = { id: 'organization-1', name: 'StadiumSphere Sports' };

const createModel = (): Model<OrganizationPersistence> => {
  const collectionQuery = {
    exec: jest.fn().mockResolvedValue([document]),
    limit: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
  };

  return {
    countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
    create: jest.fn().mockResolvedValue(document),
    find: jest.fn().mockReturnValue(collectionQuery),
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
  } as unknown as Model<OrganizationPersistence>;
};

describe('OrganizationRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new OrganizationRepository(model);

    await expect(repository.create(organization)).resolves.toBeInstanceOf(Organization);
    await expect(repository.findById(new UniqueEntityId('organization-1'))).resolves.toBeInstanceOf(
      Organization,
    );
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('organization-1'), organization)).resolves.toBeInstanceOf(
      Organization,
    );
    await expect(repository.delete(new UniqueEntityId('organization-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({ name: 'StadiumSphere Sports' });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      'organization-1',
      { $set: { name: 'StadiumSphere Sports' } },
      { new: true, runValidators: true },
    );
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new OrganizationRepository(model).create(organization)).rejects.toBeInstanceOf(
      DuplicateEntityException,
    );
  });
});
