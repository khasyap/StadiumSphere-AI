"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    static buildFilter(filter) {
        return filter ?? {};
    }
    static buildSort(sort) {
        return Object.fromEntries(Object.entries(sort ?? {}).map(([field, direction]) => [field, direction === 'asc' ? 1 : -1]));
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=query-builder.js.map