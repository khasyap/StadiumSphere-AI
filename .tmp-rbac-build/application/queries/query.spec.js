"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
describe('Query', () => {
    it('captures immutable query criteria', () => {
        const query = new query_1.Query({ page: 1, search: 'stadium' });
        expect(query.criteria).toEqual({ page: 1, search: 'stadium' });
        expect(Object.isFrozen(query.criteria)).toBe(true);
    });
});
//# sourceMappingURL=query.spec.js.map