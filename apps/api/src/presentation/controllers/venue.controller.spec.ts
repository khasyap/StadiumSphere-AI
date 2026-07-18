import type { RestApplicationService } from '../../application';
import { CreateVenueDto, UpdateVenueDto } from '../dto/venue.dto';
import { VenueController } from './venue.controller';

describe('VenueController', () => {
  const service: jest.Mocked<RestApplicationService<CreateVenueDto, UpdateVenueDto, unknown>> = {
    create: jest.fn(async (_command: CreateVenueDto) => ({ id: 'venue-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'venue-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'venue-1' })),
    update: jest.fn(async (_id: string, _command: UpdateVenueDto) => ({ id: 'venue-1' })),
  };
  const controller = new VenueController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toEqual({
      success: true,
      message: 'Venue list retrieved.',
      data: [{ id: 'venue-1' }],
    });
    await expect(controller.getById('venue-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('venue-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateVenueDto(), {
      latitude: 13.0827,
      longitude: 80.2707,
      name: 'StadiumSphere Arena',
    });
    const update = Object.assign(new UpdateVenueDto(), { latitude: 12.9716, name: 'Updated Venue' });

    await controller.create(create);
    await controller.update('venue-1', update);
    await controller.delete('venue-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('venue-1', update);
    expect(service.delete).toHaveBeenCalledWith('venue-1');
  });
});
