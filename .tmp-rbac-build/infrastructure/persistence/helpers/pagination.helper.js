"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationHelper = void 0;
const DEFAULT_LIMIT = 20;
const DEFAULT_PAGE = 1;
class PaginationHelper {
    static create(options) {
        const page = options?.page ?? DEFAULT_PAGE;
        const limit = options?.limit ?? DEFAULT_LIMIT;
        if (!Number.isInteger(page) || page < DEFAULT_PAGE) {
            throw new RangeError('Pagination page must be a positive integer.');
        }
        if (!Number.isInteger(limit) || limit < DEFAULT_PAGE) {
            throw new RangeError('Pagination limit must be a positive integer.');
        }
        return {
            limit,
            offset: (page - DEFAULT_PAGE) * limit,
            page,
        };
    }
    static createResult(data, pagination, total) {
        const totalPages = Math.ceil(total / pagination.limit);
        return {
            data,
            hasNext: pagination.page < totalPages,
            hasPrevious: pagination.page > DEFAULT_PAGE,
            limit: pagination.limit,
            offset: pagination.offset,
            page: pagination.page,
            total,
            totalPages,
        };
    }
}
exports.PaginationHelper = PaginationHelper;
//# sourceMappingURL=pagination.helper.js.map