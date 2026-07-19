import type { Model } from 'mongoose';

import { Booking, BookingStatus, UniqueEntityId } from '../../domain';
import { DuplicateEntityException } from '../persistence';
import type { BookingPersistence } from '../schemas/booking.schema';
import { BookingRepository } from './booking.repository';

const booking = new Booking(
  { eventId: 'event-1', reference: 'BOOK-2026-0001', status: BookingStatus.PENDING },
  new UniqueEntityId('booking-1'),
);
const document = { eventId: 'event-1', id: 'booking-1', reference: 'BOOK-2026-0001' };

const createModel = (): Model<BookingPersistence> => {
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
  } as unknown as Model<BookingPersistence>;
};

describe('BookingRepository', () => {
  it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
    const model = createModel();
    const repository = new BookingRepository(model);

    await expect(repository.create(booking)).resolves.toBeInstanceOf(Booking);
    await expect(repository.findById(new UniqueEntityId('booking-1'))).resolves.toBeInstanceOf(Booking);
    await expect(repository.findAll()).resolves.toHaveLength(1);
    await expect(repository.update(new UniqueEntityId('booking-1'), booking)).resolves.toBeInstanceOf(Booking);
    await expect(repository.delete(new UniqueEntityId('booking-1'))).resolves.toBeUndefined();

    expect(model.create).toHaveBeenCalledWith({
      eventId: 'event-1',
      reference: 'BOOK-2026-0001',
      status: BookingStatus.PENDING,
    });
  });

  it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
    const model = createModel();
    jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });

    await expect(new BookingRepository(model).create(booking)).rejects.toBeInstanceOf(
      DuplicateEntityException,
    );
  });
});
