import type { RestApplicationService } from '../../application';
import { CreateTeamDto, UpdateTeamDto } from '../dto/team.dto';
import { TeamController } from './team.controller';

describe('TeamController', () => {
  const service: jest.Mocked<RestApplicationService<CreateTeamDto, UpdateTeamDto, unknown>> = {
    create: jest.fn(async (_command: CreateTeamDto) => ({ id: 'team-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'team-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'team-1' })),
    update: jest.fn(async (_id: string, _command: UpdateTeamDto) => ({ id: 'team-1' })),
  };
  const controller = new TeamController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toMatchObject({ success: true });
    await expect(controller.getById('team-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('team-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateTeamDto(), {
      name: 'StadiumSphere FC',
      sportId: 'sport-1',
      sportName: 'Football',
    });
    const update = Object.assign(new UpdateTeamDto(), { name: 'Updated Team' });

    await controller.create(create);
    await controller.update('team-1', update);
    await controller.delete('team-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('team-1', update);
    expect(service.delete).toHaveBeenCalledWith('team-1');
  });
});
