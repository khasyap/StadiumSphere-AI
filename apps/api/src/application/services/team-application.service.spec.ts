import { Sport, Team, UniqueEntityId } from '../../domain';
import type { TeamRepositoryPort } from '../interfaces/application-repository.interface';
import { TeamApplicationService } from './team-application.service';

describe('TeamApplicationService', () => {
  const team = new Team(
    { name: 'StadiumSphere FC', sport: new Sport({ name: 'Football' }, new UniqueEntityId('sport-1')) },
    new UniqueEntityId('team-1'),
  );
  const repository: jest.Mocked<TeamRepositoryPort> = {
    create: jest.fn(async (entity: Team) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [team]),
    findById: jest.fn(async (_id: UniqueEntityId) => team),
    update: jest.fn(async (_id: UniqueEntityId, entity: Team) => entity),
  };
  const service = new TeamApplicationService(repository);

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
});
