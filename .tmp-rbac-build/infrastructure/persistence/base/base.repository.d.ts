import type { HydratedDocument, Model, UpdateQuery } from 'mongoose';
import type { FilterOptions } from '../filtering/filter-options';
import type { IRepository } from '../interfaces/repository.interface';
import type { RepositoryOptions } from '../interfaces/repository-options';
import type { PaginationResult } from '../pagination/pagination-result';
export declare abstract class BaseRepository<TEntity extends object> implements IRepository<TEntity> {
    protected readonly model: Model<TEntity>;
    private readonly entityName;
    protected constructor(model: Model<TEntity>, entityName: string);
    create(data: Partial<TEntity>): Promise<HydratedDocument<TEntity>>;
    update(id: string, data: UpdateQuery<TEntity>): Promise<HydratedDocument<TEntity>>;
    delete(id: string): Promise<void>;
    findById(id: string, options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>): Promise<HydratedDocument<TEntity> | null>;
    findOne(filter: FilterOptions<TEntity>, options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>): Promise<HydratedDocument<TEntity> | null>;
    findMany(options?: RepositoryOptions<TEntity>): Promise<PaginationResult<HydratedDocument<TEntity>>>;
    exists(filter: FilterOptions<TEntity>): Promise<boolean>;
    count(filter?: FilterOptions<TEntity>): Promise<number>;
    private applyReadOptions;
    private execute;
    private isDuplicateKeyError;
}
