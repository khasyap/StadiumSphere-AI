import type { FilterQuery } from 'mongoose';
export type FilterOptions<TEntity extends object> = FilterQuery<TEntity>;
