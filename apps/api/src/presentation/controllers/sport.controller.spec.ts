import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { CreateSportDto, UpdateSportDto } from '../dto/sport.dto';
import { SportController } from './sport.controller';

describe('SportController', () => {
  const service: jest.Mocked<RestApplicationService<CreateSportDto, UpdateSportDto, unknown>> = {
    create: jest.fn(async (_command: CreateSportDto) => ({ id: 'sport-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'sport-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'sport-1' })),
    update: jest.fn(async (_id: string, _command: UpdateSportDto) => ({ id: 'sport-1' })),
  };
  const controller = new SportController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toMatchObject({ success: true });
    await expect(controller.getById('sport-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('sport-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateSportDto(), { name: 'Football' });
    const update = Object.assign(new UpdateSportDto(), { name: 'Association Football' });

    await controller.create(create);
    await controller.update('sport-1', update);
    await controller.delete('sport-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('sport-1', update);
    expect(service.delete).toHaveBeenCalledWith('sport-1');
  });

  it('declares the required read, write, and delete roles', () => {
    expect(Reflect.getMetadata(ROLES_KEY, SportController.prototype.list)).toEqual([
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.STAFF,
      UserRole.USER,
    ]);
    expect(Reflect.getMetadata(ROLES_KEY, SportController.prototype.create)).toEqual([
      UserRole.ADMIN,
      UserRole.MANAGER,
    ]);
    expect(Reflect.getMetadata(ROLES_KEY, SportController.prototype.delete)).toEqual([UserRole.ADMIN]);
  });
});
