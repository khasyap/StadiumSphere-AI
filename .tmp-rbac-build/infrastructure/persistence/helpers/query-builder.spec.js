"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_builder_1 = require("./query-builder");
describe('QueryBuilder', () => {
    it('retains generic MongoDB filters', () => {
        const filter = { name: 'Arena' };
        expect(query_builder_1.QueryBuilder.buildFilter(filter)).toEqual(filter);
    });
    it('converts multiple typed sort fields to MongoDB directions', () => {
        expect(query_builder_1.QueryBuilder.buildSort({
            createdAt: 'desc',
            name: 'asc',
        })).toEqual({ createdAt: -1, name: 1 });
    });
});
//# sourceMappingURL=query-builder.spec.js.map