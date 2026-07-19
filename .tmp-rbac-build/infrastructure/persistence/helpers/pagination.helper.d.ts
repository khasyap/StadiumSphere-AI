import type { Pagination } from '../pagination/pagination';
import type { PaginationOptions } from '../pagination/pagination-options';
import type { PaginationResult } from '../pagination/pagination-result';
export declare class PaginationHelper {
    static create(options?: PaginationOptions): Pagination;
    static createResult<TEntity>(data: readonly TEntity[], pagination: Pagination, total: number): PaginationResult<TEntity>;
}
