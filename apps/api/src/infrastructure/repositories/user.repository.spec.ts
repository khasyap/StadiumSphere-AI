import type { Model } from 'mongoose';

import { Email, UniqueEntityId, User } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { UserPersistence } from '../schemas/user.schema';
import { UserRepository } from './user.repository';

const user = new User({ email: new Email('user@example.com') }, new UniqueEntityId('user-1'));
const document = { email: 'user@example.com', id: 'user-1' };

const createModel = (): Model<UserPersistence> => {
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
  } as unknown as Model<UserPersistence>;
};

describe('UserRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new UserRepository(model);

    await expect(repository.create(user)).resolves.toBeInstanceOf(User);
    await expect(repository.findById(new UniqueEntityId('user-1'))).resolves.toBeInstanceOf(User);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('user-1'), user)).resolves.toBeInstanceOf(
      User,
    );
    await expect(repository.delete(new UniqueEntityId('user-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      'user-1',
      { $set: { email: 'user@example.com' } },
      { new: true, runValidators: true },
    );
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new UserRepository(model).create(user)).rejects.toBeInstanceOf(
      DuplicateEntityException,
    );
  });
});
