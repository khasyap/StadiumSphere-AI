import { Sport, UniqueEntityId } from '../../domain';
import type { SportRepositoryPort } from '../interfaces/application-repository.interface';
import { SportApplicationService } from './sport-application.service';

describe('SportApplicationService', () => {
  const sport = new Sport({ name: 'Football' }, new UniqueEntityId('sport-1'));
  const repository: jest.Mocked<SportRepositoryPort> = {
    create: jest.fn(async (entity: Sport) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [sport]),
    findById: jest.fn(async (_id: UniqueEntityId) => sport),
    update: jest.fn(async (_id: UniqueEntityId, entity: Sport) => entity),
  };
  const service = new SportApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(service.create({ name: 'Cricket' })).resolves.toMatchObject({ id: expect.any(String) });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('sport-1')).resolves.toMatchObject({ id: 'sport-1' });
    await expect(service.update('sport-1', { name: 'Association Football' })).resolves.toMatchObject({
      id: 'sport-1',
    });
    await expect(service.delete('sport-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('sport-1'));
  });
});
