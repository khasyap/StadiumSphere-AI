import type { RestApplicationService } from '../../application';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../dto/organization.dto';
import { OrganizationController } from './organization.controller';

describe('OrganizationController', () => {
  const service: jest.Mocked<
    RestApplicationService<CreateOrganizationDto, UpdateOrganizationDto, unknown>
  > = {
    create: jest.fn(async (_command: CreateOrganizationDto) => ({ id: 'organization-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'organization-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'organization-1' })),
    update: jest.fn(async (_id: string, _command: UpdateOrganizationDto) => ({ id: 'organization-1' })),
  };
  const controller = new OrganizationController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toEqual({
      success: true,
      message: 'Organization list retrieved.',
      data: [{ id: 'organization-1' }],
    });
    await expect(controller.getById('organization-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('organization-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateOrganizationDto(), { name: 'StadiumSphere Sports' });
    const update = Object.assign(new UpdateOrganizationDto(), { name: 'StadiumSphere Operations' });

    await controller.create(create);
    await controller.update('organization-1', update);
    await controller.delete('organization-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('organization-1', update);
    expect(service.delete).toHaveBeenCalledWith('organization-1');
  });
});
