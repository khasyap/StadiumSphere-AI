"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const application_validation_exception_1 = require("../exceptions/application-validation.exception");
const booking_application_service_1 = require("./booking-application.service");
describe('BookingApplicationService', () => {
    const event = new domain_1.Event({
        name: 'Championship Final',
        status: domain_1.EventStatus.SCHEDULED,
        timeSlot: new domain_1.TimeSlot(new Date('2030-07-18T18:00:00.000Z'), new Date('2030-07-18T20:00:00.000Z')),
    }, new domain_1.UniqueEntityId('event-1'));
    const pendingBooking = new domain_1.Booking({ eventId: 'event-1', reference: 'BOOK-2026-0001', status: domain_1.BookingStatus.PENDING }, new domain_1.UniqueEntityId('booking-1'));
    const bookingRepository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        findAll: jest.fn(async () => [pendingBooking]),
        findById: jest.fn(async (_id) => pendingBooking),
        update: jest.fn(async (_id, entity) => entity),
    };
    const eventRepository = {
        create: jest.fn(async (entity) => entity),
        delete: jest.fn(async (_id) => undefined),
        existsByTimeSlot: jest.fn(async (_timeSlot) => false),
        findAll: jest.fn(async () => [event]),
        findById: jest.fn(async (_id) => event),
        update: jest.fn(async (_id, entity) => entity),
    };
    const service = new booking_application_service_1.BookingApplicationService(bookingRepository, eventRepository);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('creates pending bookings only for an existing bookable event', async () => {
        await expect(service.create({ eventId: 'event-1', reference: 'BOOK-2026-0002' })).resolves.toMatchObject({
            eventId: 'event-1',
            status: domain_1.BookingStatus.PENDING,
        });
        expect(eventRepository.findById).toHaveBeenCalledWith(new domain_1.UniqueEntityId('event-1'));
    });
    it('enforces the pending, confirmed, checked-in, and completed lifecycle', async () => {
        await expect(service.confirm('booking-1')).resolves.toMatchObject({ status: domain_1.BookingStatus.CONFIRMED });
        expect(bookingRepository.update).toHaveBeenCalledWith(new domain_1.UniqueEntityId('booking-1'), expect.objectContaining({ status: domain_1.BookingStatus.CONFIRMED }));
        await expect(service.checkIn('booking-1')).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
    });
    it('rejects confirmation for cancelled events and completed booking updates', async () => {
        eventRepository.findById.mockResolvedValueOnce(new domain_1.Event({ name: 'Cancelled', status: domain_1.EventStatus.CANCELLED, timeSlot: event.toJSON().timeSlot }, event.id));
        await expect(service.confirm('booking-1')).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
        bookingRepository.findById.mockResolvedValueOnce(new domain_1.Booking({ eventId: 'event-1', reference: 'BOOK-2026-0001', status: domain_1.BookingStatus.COMPLETED }, pendingBooking.id));
        await expect(service.update('booking-1', { reference: 'changed' })).rejects.toBeInstanceOf(application_validation_exception_1.ApplicationValidationException);
    });
});
//# sourceMappingURL=booking-application.service.spec.js.map