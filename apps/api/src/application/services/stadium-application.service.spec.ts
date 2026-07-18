import { Capacity, Stadium, UniqueEntityId } from '../../domain';
import type { StadiumRepositoryPort } from '../interfaces/application-repository.interface';
import { StadiumApplicationService } from './stadium-application.service';

describe('StadiumApplicationService', () => {
  const stadium = new Stadium(
    { capacity: new Capacity(50000), name: 'StadiumSphere Arena' },
    new UniqueEntityId('stadium-1'),
  );
  const repository: jest.Mocked<StadiumRepositoryPort> = {
    create: jest.fn(async (entity: Stadium) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [stadium]),
    findById: jest.fn(async (_id: UniqueEntityId) => stadium),
    update: jest.fn(async (_id: UniqueEntityId, entity: Stadium) => entity),
  };
  const service = new StadiumApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(service.create({ capacity: 60000, name: 'New Stadium' })).resolves.toMatchObject({
      id: expect.any(String),
    });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('stadium-1')).resolves.toMatchObject({ id: 'stadium-1' });
    await expect(service.update('stadium-1', { capacity: 55000, name: 'Updated Stadium' })).resolves.toMatchObject({
      id: 'stadium-1',
    });
    await expect(service.delete('stadium-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('stadium-1'));
  });
});
