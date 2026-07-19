import type { FilterQuery } from 'mongoose';
import type { FilterOptions } from '../filtering/filter-options';
import type { SortOptions } from '../sorting/sort-options';
export declare class QueryBuilder {
    static buildFilter<TEntity extends object>(filter?: FilterOptions<TEntity>): FilterQuery<TEntity>;
    static buildSort<TEntity extends object>(sort?: SortOptions<TEntity>): Record<string, 1 | -1>;
}
