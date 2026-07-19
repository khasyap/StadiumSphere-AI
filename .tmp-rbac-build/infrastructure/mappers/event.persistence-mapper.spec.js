"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const event_persistence_mapper_1 = require("./event.persistence-mapper");
describe('EventPersistenceMapper', () => {
    const mapper = new event_persistence_mapper_1.EventPersistenceMapper();
    const startsAt = new Date('2026-07-18T18:00:00.000Z');
    const endsAt = new Date('2026-07-18T20:00:00.000Z');
    it('maps persistence fields into a domain entity', () => {
        const event = mapper.toDomain({ id: 'event-1', endsAt, name: 'Championship Final', startsAt });
        expect(event).toBeInstanceOf(domain_1.Event);
        expect(event.toJSON()).toMatchObject({ id: 'event-1', name: 'Championship Final' });
    });
    it('maps a domain entity into persistence fields without DTO concerns', () => {
        const event = new domain_1.Event({ name: 'Championship Final', timeSlot: new domain_1.TimeSlot(startsAt, endsAt) }, new domain_1.UniqueEntityId('event-1'));
        expect(mapper.toPersistence(event)).toEqual({
            endsAt,
            name: 'Championship Final',
            startsAt,
            status: domain_1.EventStatus.SCHEDULED,
        });
    });
});
//# sourceMappingURL=event.persistence-mapper.spec.js.map