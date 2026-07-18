import { Event, TimeSlot, UniqueEntityId } from '../../domain';
import type { EventRepositoryPort } from '../interfaces/application-repository.interface';
import { EventApplicationService } from './event-application.service';

describe('EventApplicationService', () => {
  const startsAt = new Date('2026-07-18T18:00:00.000Z');
  const endsAt = new Date('2026-07-18T20:00:00.000Z');
  const event = new Event(
    { name: 'Championship Final', timeSlot: new TimeSlot(startsAt, endsAt) },
    new UniqueEntityId('event-1'),
  );
  const repository: jest.Mocked<EventRepositoryPort> = {
    create: jest.fn(async (entity: Event) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [event]),
    findById: jest.fn(async (_id: UniqueEntityId) => event),
    update: jest.fn(async (_id: UniqueEntityId, entity: Event) => entity),
  };
  const service = new EventApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates create, read, update, and delete through its repository port', async () => {
    await expect(service.create({ endsAt, name: 'Opening Match', startsAt })).resolves.toMatchObject({
      id: expect.any(String),
    });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('event-1')).resolves.toMatchObject({ id: 'event-1' });
    await expect(service.update('event-1', { name: 'Updated Final' })).resolves.toMatchObject({
      id: 'event-1',
    });
    await expect(service.delete('event-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('event-1'));
  });
});
