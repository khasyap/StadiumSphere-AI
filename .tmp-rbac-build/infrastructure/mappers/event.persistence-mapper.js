"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPersistenceMapper = void 0;
const domain_1 = require("../../domain");
class EventPersistenceMapper {
    toDomain(document) {
        return new domain_1.Event({
            name: document.name,
            status: document.status ?? domain_1.EventStatus.SCHEDULED,
            timeSlot: new domain_1.TimeSlot(document.startsAt, document.endsAt),
        }, new domain_1.UniqueEntityId(document.id));
    }
    toPersistence(entity) {
        const event = entity.toJSON();
        return {
            endsAt: event.timeSlot.endsAt,
            name: event.name,
            startsAt: event.timeSlot.startsAt,
            status: entity.status,
        };
    }
}
exports.EventPersistenceMapper = EventPersistenceMapper;
//# sourceMappingURL=event.persistence-mapper.js.map