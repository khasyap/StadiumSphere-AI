import { Email, UniqueEntityId, User } from '../../domain';
import type { UserRepositoryPort } from '../interfaces/application-repository.interface';
import { UserApplicationService } from './user-application.service';

describe('UserApplicationService', () => {
  const user = new User({ email: new Email('fan@example.com') }, new UniqueEntityId('user-1'));
  const repository: jest.Mocked<UserRepositoryPort> = {
    create: jest.fn(async (entity: User) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [user]),
    findByEmail: jest.fn(async (_email: Email) => user),
    findById: jest.fn(async (_id: UniqueEntityId) => user),
    update: jest.fn(async (_id: UniqueEntityId, entity: User) => entity),
  };
  const service = new UserApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(service.create({ email: 'new@example.com' })).resolves.toMatchObject({
      id: expect.any(String),
    });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('user-1')).resolves.toMatchObject({ id: 'user-1' });
    await expect(service.update('user-1', { email: 'updated@example.com' })).resolves.toMatchObject(
      {
        id: 'user-1',
      },
    );
    await expect(service.delete('user-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('user-1'));
  });
});
