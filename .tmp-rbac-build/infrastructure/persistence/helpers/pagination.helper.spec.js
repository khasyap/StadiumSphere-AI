"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_helper_1 = require("./pagination.helper");
describe('PaginationHelper', () => {
    it('calculates page offset and metadata', () => {
        const pagination = pagination_helper_1.PaginationHelper.create({ limit: 10, page: 2 });
        const result = pagination_helper_1.PaginationHelper.createResult(['first', 'second'], pagination, 21);
        expect(pagination).toEqual({ limit: 10, offset: 10, page: 2 });
        expect(result).toEqual({
            data: ['first', 'second'],
            hasNext: true,
            hasPrevious: true,
            limit: 10,
            offset: 10,
            page: 2,
            total: 21,
            totalPages: 3,
        });
    });
    it('rejects invalid page values', () => {
        expect(() => pagination_helper_1.PaginationHelper.create({ page: 0 })).toThrow(RangeError);
        expect(() => pagination_helper_1.PaginationHelper.create({ limit: 0 })).toThrow(RangeError);
    });
});
//# sourceMappingURL=pagination.helper.spec.js.map