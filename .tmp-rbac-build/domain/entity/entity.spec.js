"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
const unique_entity_id_1 = require("../identifier/unique-entity-id");
class TestEntity extends entity_1.Entity {
    constructor(name, id) {
        super({ name }, id);
    }
}
describe('Entity', () => {
    it('uses its identifier for equality', () => {
        const id = new unique_entity_id_1.UniqueEntityId('entity-id');
        expect(new TestEntity('First', id).equals(new TestEntity('Second', id))).toBe(true);
        expect(new TestEntity('First', id).equals(new TestEntity('Second'))).toBe(false);
    });
    it('serializes its identifier and immutable properties', () => {
        expect(new TestEntity('Stadium', new unique_entity_id_1.UniqueEntityId('entity-id')).toJSON()).toEqual({
            id: 'entity-id',
            name: 'Stadium',
        });
    });
});
//# sourceMappingURL=entity.spec.js.map