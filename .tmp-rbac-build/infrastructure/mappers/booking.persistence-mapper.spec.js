"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const booking_persistence_mapper_1 = require("./booking.persistence-mapper");
describe('BookingPersistenceMapper', () => {
    const mapper = new booking_persistence_mapper_1.BookingPersistenceMapper();
    it('maps persistence fields into a domain entity', () => {
        const booking = mapper.toDomain({
            eventId: 'event-1',
            id: 'booking-1',
            reference: 'BOOK-2026-0001',
        });
        expect(booking).toBeInstanceOf(domain_1.Booking);
        expect(booking.toJSON()).toMatchObject({ id: 'booking-1', reference: 'BOOK-2026-0001' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const booking = new domain_1.Booking({ eventId: 'event-1', reference: 'BOOK-2026-0001', status: domain_1.BookingStatus.PENDING }, new domain_1.UniqueEntityId('booking-1'));
        expect(mapper.toPersistence(booking)).toEqual({
            eventId: 'event-1',
            reference: 'BOOK-2026-0001',
            status: domain_1.BookingStatus.PENDING,
        });
    });
});
//# sourceMappingURL=booking.persistence-mapper.spec.js.map