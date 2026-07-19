"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const booking_dto_1 = require("../dto/booking.dto");
const booking_controller_1 = require("./booking.controller");
describe('BookingController', () => {
    const service = {
        create: jest.fn(async (_command) => ({ id: 'booking-1' })),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [{ id: 'booking-1' }]),
        findById: jest.fn(async (_id) => ({ id: 'booking-1' })),
        update: jest.fn(async (_id, _command) => ({ id: 'booking-1' })),
        cancel: jest.fn(async (_id) => ({ id: 'booking-1' })),
        checkIn: jest.fn(async (_id) => ({ id: 'booking-1' })),
        complete: jest.fn(async (_id) => ({ id: 'booking-1' })),
        confirm: jest.fn(async (_id) => ({ id: 'booking-1' })),
    };
    const controller = new booking_controller_1.BookingController(service);
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
        const create = Object.assign(new booking_dto_1.CreateBookingDto(), { eventId: 'event-1', reference: 'BOOK-2026-0001' });
        const update = Object.assign(new booking_dto_1.UpdateBookingDto(), { reference: 'BOOK-2026-0002' });
        await controller.create(create);
        await controller.update('booking-1', update);
        await controller.delete('booking-1');
        expect(service.create).toHaveBeenCalledWith(create);
        expect(service.update).toHaveBeenCalledWith('booking-1', update);
        expect(service.delete).toHaveBeenCalledWith('booking-1');
    });
    it('delegates booking workflow actions to the application service', async () => {
        await controller.confirm('booking-1');
        await controller.cancel('booking-1');
        await controller.checkIn('booking-1');
        await controller.complete('booking-1');
        expect(service.confirm).toHaveBeenCalledWith('booking-1');
        expect(service.cancel).toHaveBeenCalledWith('booking-1');
        expect(service.checkIn).toHaveBeenCalledWith('booking-1');
        expect(service.complete).toHaveBeenCalledWith('booking-1');
    });
});
//# sourceMappingURL=booking.controller.spec.js.map