"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const persistence_1 = require("../persistence");
const booking_repository_1 = require("./booking.repository");
const booking = new domain_1.Booking({ eventId: 'event-1', reference: 'BOOK-2026-0001', status: domain_1.BookingStatus.PENDING }, new domain_1.UniqueEntityId('booking-1'));
const document = { eventId: 'event-1', id: 'booking-1', reference: 'BOOK-2026-0001' };
const createModel = () => {
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
    };
};
describe('BookingRepository', () => {
    it('uses BaseRepository operations for CRUD and maps results to domain entities', async () => {
        const model = createModel();
        const repository = new booking_repository_1.BookingRepository(model);
        await expect(repository.create(booking)).resolves.toBeInstanceOf(domain_1.Booking);
        await expect(repository.findById(new domain_1.UniqueEntityId('booking-1'))).resolves.toBeInstanceOf(domain_1.Booking);
        await expect(repository.findAll()).resolves.toHaveLength(1);
        await expect(repository.update(new domain_1.UniqueEntityId('booking-1'), booking)).resolves.toBeInstanceOf(domain_1.Booking);
        await expect(repository.delete(new domain_1.UniqueEntityId('booking-1'))).resolves.toBeUndefined();
        expect(model.create).toHaveBeenCalledWith({
            eventId: 'event-1',
            reference: 'BOOK-2026-0001',
            status: domain_1.BookingStatus.PENDING,
        });
    });
    it('translates a duplicate MongoDB key error through the shared persistence layer', async () => {
        const model = createModel();
        jest.mocked(model.create).mockRejectedValueOnce({ code: 11_000 });
        await expect(new booking_repository_1.BookingRepository(model).create(booking)).rejects.toBeInstanceOf(persistence_1.DuplicateEntityException);
    });
});
//# sourceMappingURL=booking.repository.spec.js.map