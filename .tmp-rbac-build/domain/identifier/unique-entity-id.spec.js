"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = require("./unique-entity-id");
describe('UniqueEntityId', () => {
    it('compares explicitly supplied values strongly', () => {
        expect(new unique_entity_id_1.UniqueEntityId('user-1').equals(new unique_entity_id_1.UniqueEntityId('user-1'))).toBe(true);
        expect(new unique_entity_id_1.UniqueEntityId('user-1').equals(new unique_entity_id_1.UniqueEntityId('user-2'))).toBe(false);
        expect(new unique_entity_id_1.UniqueEntityId('user-1').toString()).toBe('user-1');
    });
    it('rejects blank identifiers', () => {
        expect(() => new unique_entity_id_1.UniqueEntityId('   ')).toThrow(TypeError);
    });
});
//# sourceMappingURL=unique-entity-id.spec.js.map