import { Event, EventStatus, TimeSlot, UniqueEntityId } from '../../domain';
import { ApplicationValidationException } from '../exceptions/application-validation.exception';
import type { EventRepositoryPort } from '../interfaces/application-repository.interface';
import { EventApplicationService } from './event-application.service';

describe('EventApplicationService', () => {
  const startsAt = new Date('2030-07-18T18:00:00.000Z');
  const endsAt = new Date('2030-07-18T20:00:00.000Z');
  const scheduledEvent = new Event(
    { name: 'Championship Final', status: EventStatus.SCHEDULED, timeSlot: new TimeSlot(startsAt, endsAt) },
    new UniqueEntityId('event-1'),
  );
  const repository: jest.Mocked<EventRepositoryPort> = {
    create: jest.fn(async (entity: Event) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    existsByTimeSlot: jest.fn(async (_timeSlot: TimeSlot) => false),
    findAll: jest.fn(async () => [scheduledEvent]),
    findById: jest.fn(async (_id: UniqueEntityId) => scheduledEvent),
    update: jest.fn(async (_id: UniqueEntityId, entity: Event) => entity),
  };
  const service = new EventApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('schedules only future events with an available time slot', async () => {
    await expect(service.create({ endsAt, name: 'Opening Match', startsAt })).resolves.toMatchObject({
      status: EventStatus.SCHEDULED,
    });

    repository.existsByTimeSlot.mockResolvedValueOnce(true);
    await expect(service.create({ endsAt, name: 'Duplicate', startsAt })).rejects.toBeInstanceOf(
      ApplicationValidationException,
    );
  });

  it('enforces scheduled, live, finished event transitions', async () => {
    await expect(service.start('event-1')).resolves.toMatchObject({ status: EventStatus.LIVE });

    repository.findById.mockResolvedValueOnce(
      new Event(
        { name: scheduledEvent.toJSON().name, status: EventStatus.LIVE, timeSlot: scheduledEvent.toJSON().timeSlot },
        scheduledEvent.id,
      ),
    );
    await expect(service.finish('event-1')).resolves.toMatchObject({ status: EventStatus.FINISHED });
  });

  it('rejects invalid transitions and scheduling in the past', async () => {
    await expect(service.finish('event-1')).rejects.toBeInstanceOf(ApplicationValidationException);
    await expect(
      service.create({
        endsAt: new Date('2020-07-18T20:00:00.000Z'),
        name: 'Past Event',
        startsAt: new Date('2020-07-18T18:00:00.000Z'),
      }),
    ).rejects.toBeInstanceOf(ApplicationValidationException);
  });

  it('keeps finished events immutable', async () => {
    repository.findById.mockResolvedValueOnce(
      new Event(
        {
          name: scheduledEvent.toJSON().name,
          status: EventStatus.FINISHED,
          timeSlot: scheduledEvent.toJSON().timeSlot,
        },
        scheduledEvent.id,
      ),
    );

    await expect(service.update('event-1', { name: 'Updated Final' })).rejects.toBeInstanceOf(
      ApplicationValidationException,
    );
  });
});
