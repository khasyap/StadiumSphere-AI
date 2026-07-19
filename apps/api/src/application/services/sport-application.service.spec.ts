import { Sport, UniqueEntityId } from '../../domain';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { SportRepositoryPort, TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { SportApplicationService } from './sport-application.service';

describe('SportApplicationService', () => {
  const sport = new Sport({ name: 'Football' }, new UniqueEntityId('sport-1'));
  const repository: jest.Mocked<SportRepositoryPort> = {
    create: jest.fn(async (entity: Sport) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [sport]),
    findById: jest.fn(async (_id: UniqueEntityId) => sport),
    findByName: jest.fn(async (_name: string) => null),
    update: jest.fn(async (_id: UniqueEntityId, entity: Sport) => entity),
  };
  const teamRepository: jest.Mocked<TeamRepositoryPort> = {
    create: jest.fn(async (entity) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    existsBySportId: jest.fn(async (_sportId: UniqueEntityId) => false),
    findAll: jest.fn(async () => []),
    findById: jest.fn(async (_id: UniqueEntityId) => null),
    findBySportIdAndName: jest.fn(async (_sportId: UniqueEntityId, _name: string) => null),
    update: jest.fn(async (_id: UniqueEntityId, entity) => entity),
  };
  const service = new SportApplicationService(repository, teamRepository);

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

  it('prevents deletion while Teams reference the Sport', async () => {
    jest.mocked(teamRepository.existsBySportId).mockResolvedValueOnce(true);

    await expect(service.delete('sport-1')).rejects.toBeInstanceOf(ApplicationValidationException);
  });

  it('rejects duplicate Sport names before persistence', async () => {
    repository.findByName.mockResolvedValueOnce(sport);

    await expect(service.create({ name: 'Football' })).rejects.toBeInstanceOf(ApplicationValidationException);
    expect(repository.create).not.toHaveBeenCalled();
  });
});
