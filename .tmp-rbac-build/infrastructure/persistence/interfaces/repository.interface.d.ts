import type { HydratedDocument, UpdateQuery } from 'mongoose';
import type { FilterOptions } from '../filtering/filter-options';
import type { PaginationResult } from '../pagination/pagination-result';
import type { RepositoryOptions } from './repository-options';
export interface IRepository<TEntity extends object> {
    count(filter?: FilterOptions<TEntity>): Promise<number>;
    create(data: Partial<TEntity>): Promise<HydratedDocument<TEntity>>;
    delete(id: string): Promise<void>;
    exists(filter: FilterOptions<TEntity>): Promise<boolean>;
    findById(id: string, options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>): Promise<HydratedDocument<TEntity> | null>;
    findMany(options?: RepositoryOptions<TEntity>): Promise<PaginationResult<HydratedDocument<TEntity>>>;
    findOne(filter: FilterOptions<TEntity>, options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>): Promise<HydratedDocument<TEntity> | null>;
    update(id: string, data: UpdateQuery<TEntity>): Promise<HydratedDocument<TEntity>>;
}
