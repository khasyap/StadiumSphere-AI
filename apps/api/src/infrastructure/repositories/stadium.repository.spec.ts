import type { Model } from 'mongoose';

import { Capacity, Stadium, StadiumStatus, UniqueEntityId } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { StadiumPersistence } from '../schemas/stadium.schema';
import { StadiumRepository } from './stadium.repository';

const stadium = new Stadium(
  { capacity: new Capacity(50000), name: 'StadiumSphere Arena' },
  new UniqueEntityId('stadium-1'),
);
const document = { id: 'stadium-1', capacity: 50000, name: 'StadiumSphere Arena' };

const createModel = (): Model<StadiumPersistence> => {
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
  } as unknown as Model<StadiumPersistence>;
};

describe('StadiumRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new StadiumRepository(model);

    await expect(repository.create(stadium)).resolves.toBeInstanceOf(Stadium);
    await expect(repository.findById(new UniqueEntityId('stadium-1'))).resolves.toBeInstanceOf(Stadium);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('stadium-1'), stadium)).resolves.toBeInstanceOf(Stadium);
    await expect(repository.delete(new UniqueEntityId('stadium-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({
      capacity: 50000,
      name: 'StadiumSphere Arena',
      status: StadiumStatus.AVAILABLE,
    });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      'stadium-1',
      { $set: { capacity: 50000, name: 'StadiumSphere Arena', status: StadiumStatus.AVAILABLE } },
      { new: true, runValidators: true },
    );
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new StadiumRepository(model).create(stadium)).rejects.toBeInstanceOf(
      DuplicateEntityException,
    );
  });
});
