import type { FilterQuery } from 'mongoose';

import type { FilterOptions } from '../filtering/filter-options';
import type { SortOptions } from '../sorting/sort-options';

export class QueryBuilder {
  public static buildFilter<TEntity extends object>(
    filter?: FilterOptions<TEntity>,
  ): FilterQuery<TEntity> {
    return filter ?? {};
  }

  public static buildSort<TEntity extends object>(
    sort?: SortOptions<TEntity>,
  ): Record<string, 1 | -1> {
    return Object.fromEntries(
      Object.entries(sort ?? {}).map(([field, direction]) => [field, direction === 'asc' ? 1 : -1]),
    );
  }
}
