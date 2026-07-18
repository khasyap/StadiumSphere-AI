import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { StadiumController } from './stadium.controller';
import { CreateStadiumDto, UpdateStadiumDto } from '../dto/stadium.dto';

describe('StadiumController', () => {
  const service: jest.Mocked<RestApplicationService<CreateStadiumDto, UpdateStadiumDto, unknown>> = {
    create: jest.fn(async (_command: CreateStadiumDto) => ({ id: 'stadium-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'stadium-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'stadium-1' })),
    update: jest.fn(async (_id: string, _command: UpdateStadiumDto) => ({ id: 'stadium-1' })),
  };
  const controller = new StadiumController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toEqual({
      success: true,
      message: 'Stadium list retrieved.',
      data: [{ id: 'stadium-1' }],
    });
    await expect(controller.getById('stadium-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('stadium-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateStadiumDto(), { capacity: 50000, name: 'StadiumSphere Arena' });
    const update = Object.assign(new UpdateStadiumDto(), { capacity: 55000, name: 'Updated Stadium' });

    await controller.create(create);
    await controller.update('stadium-1', update);
    await controller.delete('stadium-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('stadium-1', update);
    expect(service.delete).toHaveBeenCalledWith('stadium-1');
  });

  it('declares representative authorization roles without changing controller delegation', () => {
    expect(Reflect.getMetadata(ROLES_KEY, StadiumController.prototype.list)).toEqual([
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.STAFF,
      UserRole.USER,
    ]);
    expect(Reflect.getMetadata(ROLES_KEY, StadiumController.prototype.create)).toEqual([
      UserRole.ADMIN,
      UserRole.MANAGER,
    ]);
    expect(Reflect.getMetadata(ROLES_KEY, StadiumController.prototype.delete)).toEqual([UserRole.ADMIN]);
  });
});
