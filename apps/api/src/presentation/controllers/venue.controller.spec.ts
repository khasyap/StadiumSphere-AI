import type { RestApplicationService } from '../../application';
import type { VenueApplicationService } from '../../application';
import { CreateVenueDto, ReserveVenueDto, UpdateVenueDto } from '../dto/venue.dto';
import { VenueController } from './venue.controller';

describe('VenueController', () => {
  type VenueWorkflowService = RestApplicationService<CreateVenueDto, UpdateVenueDto, unknown> &
    Pick<VenueApplicationService, 'close' | 'maintenance' | 'open' | 'release' | 'reserve'>;

  const service: jest.Mocked<VenueWorkflowService> = {
    close: jest.fn(async (_id: string) => ({ id: 'venue-1' })),
    create: jest.fn(async (_command: CreateVenueDto) => ({ id: 'venue-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'venue-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'venue-1' })),
    maintenance: jest.fn(async (_id: string) => ({ id: 'venue-1' })),
    open: jest.fn(async (_id: string) => ({ id: 'venue-1' })),
    release: jest.fn(async (_id: string) => ({ id: 'venue-1' })),
    reserve: jest.fn(async (_id: string, _startsAt: Date, _endsAt: Date) => ({ id: 'venue-1' })),
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

  it('delegates operational workflows to the application service', async () => {
    const reservation = Object.assign(new ReserveVenueDto(), {
      endsAt: new Date('2026-07-20T20:00:00.000Z'),
      startsAt: new Date('2026-07-20T18:00:00.000Z'),
    });

    await controller.reserve('venue-1', reservation);
    await controller.release('venue-1');
    await controller.maintenance('venue-1');
    await controller.open('venue-1');
    await controller.close('venue-1');

    expect(service.reserve).toHaveBeenCalledWith('venue-1', reservation.startsAt, reservation.endsAt);
    expect(service.release).toHaveBeenCalledWith('venue-1');
    expect(service.maintenance).toHaveBeenCalledWith('venue-1');
    expect(service.open).toHaveBeenCalledWith('venue-1');
    expect(service.close).toHaveBeenCalledWith('venue-1');
  });
});
