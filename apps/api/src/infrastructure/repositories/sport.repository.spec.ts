import type { Model } from 'mongoose';

import { Sport, UniqueEntityId } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { SportPersistence } from '../schemas/sport.schema';
import { SportRepository } from './sport.repository';

const sport = new Sport({ name: 'Football' }, new UniqueEntityId('sport-1'));
const document = { id: 'sport-1', name: 'Football' };

const createModel = (): Model<SportPersistence> => {
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
  } as unknown as Model<SportPersistence>;
};

describe('SportRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new SportRepository(model);

    await expect(repository.create(sport)).resolves.toBeInstanceOf(Sport);
    await expect(repository.findById(new UniqueEntityId('sport-1'))).resolves.toBeInstanceOf(Sport);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('sport-1'), sport)).resolves.toBeInstanceOf(Sport);
    await expect(repository.delete(new UniqueEntityId('sport-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({ name: 'Football' });
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new SportRepository(model).create(sport)).rejects.toBeInstanceOf(DuplicateEntityException);
  });
});
