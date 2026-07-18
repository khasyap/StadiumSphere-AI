import type { Model } from 'mongoose';

import { DuplicateEntityException } from '../exceptions/duplicate-entity.exception';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';
import { PersistenceException } from '../exceptions/persistence.exception';
import { BaseRepository } from './base.repository';

interface ExampleEntity {
  readonly active: boolean;
  readonly name: string;
}

class ExampleRepository extends BaseRepository<ExampleEntity> {
  public constructor(model: Model<ExampleEntity>) {
    super(model, 'ExampleEntity');
  }
}

describe('BaseRepository', () => {
  it('applies generic filters, sorting, pagination, projection, and population', async () => {
    const document = { active: true, name: 'Arena' };
    const query = {
      exec: jest.fn().mockResolvedValue([document]),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
    };
    const model = {
      countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(3) }),
      find: jest.fn().mockReturnValue(query),
    } as unknown as Model<ExampleEntity>;
    const repository = new ExampleRepository(model);

    const result = await repository.findMany({
      filter: { active: true },
      pagination: { limit: 2, page: 2 },
      population: { path: 'owner' },
      projection: { name: 1 },
      sort: { name: 'asc' },
    });

    expect(model.find).toHaveBeenCalledWith({ active: true });
    expect(query.select).toHaveBeenCalledWith({ name: 1 });
    expect(query.populate).toHaveBeenCalledWith({ path: 'owner' });
    expect(query.skip).toHaveBeenCalledWith(2);
    expect(query.limit).toHaveBeenCalledWith(2);
    expect(query.sort).toHaveBeenCalledWith({ name: 1 });
    expect(result).toMatchObject({ hasNext: false, page: 2, total: 3, totalPages: 2 });
  });

  it('maps duplicate-key and missing-entity failures to persistence exceptions', async () => {
    const duplicateModel = {
      create: jest.fn().mockRejectedValue({ code: 11_000 }),
    } as unknown as Model<ExampleEntity>;
    const missingModel = {
      findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
    } as unknown as Model<ExampleEntity>;

    await expect(
      new ExampleRepository(duplicateModel).create({ name: 'Arena' }),
    ).rejects.toBeInstanceOf(DuplicateEntityException);
    await expect(
      new ExampleRepository(missingModel).update('example-id', { $set: { name: 'Arena' } }),
    ).rejects.toBeInstanceOf(EntityNotFoundException);
  });

  it('maps read failures to a persistence exception', async () => {
    const query = {
      exec: jest.fn().mockRejectedValue(new Error('MongoDB is unavailable')),
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
    };
    const model = {
      countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(0) }),
      find: jest.fn().mockReturnValue(query),
    } as unknown as Model<ExampleEntity>;

    await expect(new ExampleRepository(model).findMany()).rejects.toEqual(
      new PersistenceException('Unable to find ExampleEntity.'),
    );
  });
});
