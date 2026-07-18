import type { RestApplicationService } from '../../application';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { BookingController } from './booking.controller';

describe('BookingController', () => {
  const service: jest.Mocked<RestApplicationService<CreateBookingDto, UpdateBookingDto, unknown>> = {
    create: jest.fn(async (_command: CreateBookingDto) => ({ id: 'booking-1' })),
    delete: jest.fn(async (_id: string) => undefined),
    findAll: jest.fn(async () => [{ id: 'booking-1' }]),
    findById: jest.fn(async (_id: string) => ({ id: 'booking-1' })),
    update: jest.fn(async (_id: string, _command: UpdateBookingDto) => ({ id: 'booking-1' })),
  };
  const controller = new BookingController(service);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates reads to the application service and wraps the response', async () => {
    await expect(controller.list()).resolves.toMatchObject({ success: true });
    await expect(controller.getById('booking-1')).resolves.toMatchObject({ success: true });

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findById).toHaveBeenCalledWith('booking-1');
  });

  it('delegates commands without mapping or persistence access', async () => {
    const create = Object.assign(new CreateBookingDto(), { reference: 'BOOK-2026-0001' });
    const update = Object.assign(new UpdateBookingDto(), { reference: 'BOOK-2026-0002' });

    await controller.create(create);
    await controller.update('booking-1', update);
    await controller.delete('booking-1');

    expect(service.create).toHaveBeenCalledWith(create);
    expect(service.update).toHaveBeenCalledWith('booking-1', update);
    expect(service.delete).toHaveBeenCalledWith('booking-1');
  });
});
