import type { PopulateOptions, ProjectionType } from 'mongoose';

import type { FilterOptions } from '../filtering/filter-options';
import type { PaginationOptions } from '../pagination/pagination-options';
import type { SortOptions } from '../sorting/sort-options';

export interface RepositoryOptions<TEntity extends object> {
  readonly filter?: FilterOptions<TEntity>;
  readonly pagination?: PaginationOptions;
  readonly population?: PopulateOptions | PopulateOptions[];
  readonly projection?: ProjectionType<TEntity>;
  readonly sort?: SortOptions<TEntity>;
}
