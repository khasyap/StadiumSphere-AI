"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class BookingPersistenceMapper {
    toDomain(document) {
        return new domain_1.Booking({
            eventId: document.eventId,
            reference: document.reference,
            status: document.status ?? domain_1.BookingStatus.PENDING,
        }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        const booking = entity.toJSON();
        return { eventId: booking.eventId, reference: booking.reference, status: entity.status };
    }
}
exports.BookingPersistenceMapper = BookingPersistenceMapper;
//# sourceMappingURL=booking.persistence-mapper.js.map