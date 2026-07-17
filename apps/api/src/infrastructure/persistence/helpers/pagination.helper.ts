import type { Pagination } from '../pagination/pagination';
import type { PaginationOptions } from '../pagination/pagination-options';
import type { PaginationResult } from '../pagination/pagination-result';

const DEFAULT_LIMIT = 20;
const DEFAULT_PAGE = 1;

export class PaginationHelper {
  public static create(options?: PaginationOptions): Pagination {
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

  public static createResult<TEntity>(
    data: readonly TEntity[],
    pagination: Pagination,
    total: number,
  ): PaginationResult<TEntity> {
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
