"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = require("../identifier/unique-entity-id");
const aggregate_root_1 = require("./aggregate-root");
class TestAggregate extends aggregate_root_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    record(event) {
        this.addDomainEvent(event);
    }
}
describe('AggregateRoot', () => {
    it('collects and clears domain events without publishing them', () => {
        const aggregate = new TestAggregate({ name: 'Venue' }, new unique_entity_id_1.UniqueEntityId('aggregate-id'));
        const event = {
            aggregateId: aggregate.id,
            name: 'venue.created',
            occurredAt: new Date('2026-01-01T00:00:00.000Z'),
            payload: { name: 'Venue' },
        };
        aggregate.record(event);
        expect(aggregate.getDomainEvents()).toEqual([event]);
        expect(aggregate.getDomainEvents()).not.toBe(aggregate.getDomainEvents());
        aggregate.clearDomainEvents();
        expect(aggregate.getDomainEvents()).toEqual([]);
    });
});
//# sourceMappingURL=aggregate-root.spec.js.map