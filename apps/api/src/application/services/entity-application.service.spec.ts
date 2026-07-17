import { Email, UniqueEntityId, User } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import type { ApplicationRepository } from '../interfaces/application-repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { EntityApplicationService } from './entity-application.service';

describe('EntityApplicationService', () => {
  const user = new User({ email: new Email('user@example.com') }, new UniqueEntityId('user-1'));
  const mapper = new UserMapper();

  const createService = (repository: ApplicationRepository<User>) =>
    new EntityApplicationService(repository, mapper);

  it('coordinates a repository port and mapper to read entities', async () => {
    const repository: ApplicationRepository<User> = {
      create: jest.fn(async (entity: User) => entity),
      delete: jest.fn(async () => undefined),
      findAll: jest.fn(async () => [user]),
      findById: jest.fn(async () => user),
      update: jest.fn(async (_id: UniqueEntityId, entity: User) => entity),
    };

    const service = createService(repository);

    await expect(service.findById('user-1')).resolves.toEqual({
      id: 'user-1',
      email: 'user@example.com',
    });
    await expect(service.findAll()).resolves.toEqual([{ id: 'user-1', email: 'user@example.com' }]);
  });

  it('raises an application exception when a repository port has no entity', async () => {
    const repository: ApplicationRepository<User> = {
      create: jest.fn(async (entity: User) => entity),
      delete: jest.fn(async () => undefined),
      findAll: jest.fn(async () => []),
      findById: jest.fn(async () => null),
      update: jest.fn(async (_id: UniqueEntityId, entity: User) => entity),
    };

    await expect(createService(repository).findById('missing-user')).rejects.toThrow(
      ApplicationEntityNotFoundException,
    );
  });
});
