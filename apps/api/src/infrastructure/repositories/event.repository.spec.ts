import type { Model } from 'mongoose';

import { Event, TimeSlot, UniqueEntityId } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { EventPersistence } from '../schemas/event.schema';
import { EventRepository } from './event.repository';

const startsAt = new Date('2026-07-18T18:00:00.000Z');
const endsAt = new Date('2026-07-18T20:00:00.000Z');
const event = new Event(
  { name: 'Championship Final', timeSlot: new TimeSlot(startsAt, endsAt) },
  new UniqueEntityId('event-1'),
);
const document = { id: 'event-1', endsAt, name: 'Championship Final', startsAt };

const createModel = (): Model<EventPersistence> => {
  const collectionQuery = {
    exec: jest.fn().mockResolvedValue([document]),
    limit: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
  };

  return {
    countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(1) }),
    create: jest.fn().mockResolvedValue(document),
    find: jest.fn().mockReturnValue(collectionQuery),
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(document) }),
  } as unknown as Model<EventPersistence>;
};

describe('EventRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new EventRepository(model);

    await expect(repository.create(event)).resolves.toBeInstanceOf(Event);
    await expect(repository.findById(new UniqueEntityId('event-1'))).resolves.toBeInstanceOf(Event);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('event-1'), event)).resolves.toBeInstanceOf(Event);
    await expect(repository.delete(new UniqueEntityId('event-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({ endsAt, name: 'Championship Final', startsAt });
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new EventRepository(model).create(event)).rejects.toBeInstanceOf(DuplicateEntityException);
  });
});
