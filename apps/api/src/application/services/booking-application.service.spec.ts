import { Booking, UniqueEntityId } from '../../domain';
import type { BookingRepositoryPort } from '../interfaces/application-repository.interface';
import { BookingApplicationService } from './booking-application.service';

describe('BookingApplicationService', () => {
  const booking = new Booking({ reference: 'BOOK-2026-0001' }, new UniqueEntityId('booking-1'));
  const repository: jest.Mocked<BookingRepositoryPort> = {
    create: jest.fn(async (entity: Booking) => entity),
    delete: jest.fn(async (_id: UniqueEntityId) => undefined),
    findAll: jest.fn(async () => [booking]),
    findById: jest.fn(async (_id: UniqueEntityId) => booking),
    update: jest.fn(async (_id: UniqueEntityId, entity: Booking) => entity),
  };
  const service = new BookingApplicationService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('coordinates placeholder CRUD through its repository port', async () => {
    await expect(service.create({ reference: 'BOOK-2026-0002' })).resolves.toMatchObject({
      id: expect.any(String),
    });
    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findById('booking-1')).resolves.toMatchObject({ id: 'booking-1' });
    await expect(service.update('booking-1', { reference: 'BOOK-2026-0003' })).resolves.toMatchObject({
      id: 'booking-1',
    });
    await expect(service.delete('booking-1')).resolves.toBeUndefined();

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.update).toHaveBeenCalledTimes(1);
    expect(repository.delete).toHaveBeenCalledWith(new UniqueEntityId('booking-1'));
  });
});
