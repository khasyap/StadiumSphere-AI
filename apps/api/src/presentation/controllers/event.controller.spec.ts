import type { EventApplicationService } from '../../application';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { EventController } from './event.controller';

describe('EventController', () => {
  const service = {
    create: jest.fn(async (_command: CreateEventDto) => ({ id: 'event-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'event-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'event-1' })),
    update: jest.fn(async (_id: string, _command: UpdateEventDto) => ({ id: 'event-1' })),
    cancel: jest.fn(async (_id: string) => ({ id: 'event-1' })),
    finish: jest.fn(async (_id: string) => ({ id: 'event-1' })),
    start: jest.fn(async (_id: string) => ({ id: 'event-1' })),
  };
  const controller = new EventController(service as unknown as EventApplicationService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toMatchObject({ success: true });
    await expect(controller.getById('event-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('event-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateEventDto(), {
      endsAt: new Date('2026-07-18T20:00:00.000Z'),
      name: 'Championship Final',
      startsAt: new Date('2026-07-18T18:00:00.000Z'),
    });
    const update = Object.assign(new UpdateEventDto(), { name: 'Updated Final' });

    await controller.create(create);
    await controller.update('event-1', update);
    await controller.delete('event-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('event-1', update);
    expect(service.delete).toHaveBeenCalledWith('event-1');
  });

  it('delegates event workflow actions to the application service', async () => {
    await controller.start('event-1');
    await controller.finish('event-1');
    await controller.cancel('event-1');

    expect(service.start).toHaveBeenCalledWith('event-1');
    expect(service.finish).toHaveBeenCalledWith('event-1');
    expect(service.cancel).toHaveBeenCalledWith('event-1');
  });
});
