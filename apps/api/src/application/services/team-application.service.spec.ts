import { Sport, Team, UniqueEntityId } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { SportRepositoryPort, TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { TeamApplicationService } from './team-application.service';

describe('TeamApplicationService', () => {
  const team = new Team(
    { name: 'StadiumSphere FC', sport: new Sport({ name: 'Football' }, new UniqueEntityId('sport-1')) },
    new UniqueEntityId('team-1'),
  );
  const repository: jest.Mocked<TeamRepositoryPort> = {
    create: jest.fn(async (entity: Team) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    existsBySportId: jest.fn(async (_sportId: UniqueEntityId) => false),
    findAll: jest.fn(async () => [team]),
    findById: jest.fn(async (_id: UniqueEntityId) => team),
    findBySportIdAndName: jest.fn(async (_sportId: UniqueEntityId, _name: string) => null),
    update: jest.fn(async (_id: UniqueEntityId, entity: Team) => entity),
  };
  const sportRepository: jest.Mocked<SportRepositoryPort> = {
    create: jest.fn(async (entity: Sport) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [team.toJSON().sport]),
    findById: jest.fn(async (_id: UniqueEntityId) => team.toJSON().sport),
    findByName: jest.fn(async (_name: string) => null),
    update: jest.fn(async (_id: UniqueEntityId, entity: Sport) => entity),
  };
  const service = new TeamApplicationService(repository, sportRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(
      service.create({ name: 'New Team', sportId: 'sport-1', sportName: 'Football' }),
    ).resolves.toMatchObject({ id: expect.any(String) });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('team-1')).resolves.toMatchObject({ id: 'team-1' });
    await expect(service.update('team-1', { name: 'Updated Team' })).resolves.toMatchObject({
      id: 'team-1',
    });
    await expect(service.delete('team-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('team-1'));
  });

  it('rejects a missing Sport reference and inconsistent sport data', async () => {
    jest.mocked(sportRepository.findById).mockResolvedValueOnce(null);

    await expect(
      service.create({ name: 'New Team', sportId: 'missing-sport', sportName: 'Football' }),
    ).rejects.toBeInstanceOf(ApplicationEntityNotFoundException);
    await expect(
      service.create({ name: 'New Team', sportId: 'sport-1', sportName: 'Cricket' }),
    ).rejects.toBeInstanceOf(ApplicationValidationException);
    await expect(service.update('team-1', { sportName: 'Cricket' })).rejects.toBeInstanceOf(
      ApplicationValidationException,
    );
  });

  it('rejects duplicate Team names within a Sport', async () => {
    repository.findBySportIdAndName.mockResolvedValueOnce(team);

    await expect(
      service.create({ name: 'StadiumSphere FC', sportId: 'sport-1', sportName: 'Football' }),
    ).rejects.toBeInstanceOf(ApplicationValidationException);
    expect(repository.create).not.toHaveBeenCalled();
  });
});
