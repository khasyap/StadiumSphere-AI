import { HttpException } from '@nestjs/common';
import type { HydratedDocument, Model, UpdateQuery } from 'mongoose';

import { DuplicateEntityException } from '../exceptions/duplicate-entity.exception';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';
import { PersistenceException } from '../exceptions/persistence.exception';
import type { FilterOptions } from '../filtering/filter-options';
import { PaginationHelper } from '../helpers/pagination.helper';
import { QueryBuilder } from '../helpers/query-builder';
import type { IRepository } from '../interfaces/repository.interface';
import type { RepositoryOptions } from '../interfaces/repository-options';
import type { PaginationResult } from '../pagination/pagination-result';

export abstract class BaseRepository<TEntity extends object> implements IRepository<TEntity> {
  protected constructor(
    protected readonly model: Model<TEntity>,
    private readonly entityName: string,
  ) {}

  public async create(data: Partial<TEntity>): Promise<HydratedDocument<TEntity>> {
    return this.execute(() => this.model.create(data), 'create');
  }

  public async update(id: string, data: UpdateQuery<TEntity>): Promise<HydratedDocument<TEntity>> {
    return this.execute(async () => {
      const document = await this.model
        .findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .exec();

      if (document === null) {
        throw new EntityNotFoundException(this.entityName, id);
      }

      return document;
    }, 'update');
  }

  public async delete(id: string): Promise<void> {
    await this.execute(async () => {
      const document = await this.model.findByIdAndDelete(id).exec();

      if (document === null) {
        throw new EntityNotFoundException(this.entityName, id);
      }
    }, 'delete');
  }

  public async findById(
    id: string,
    options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>,
  ): Promise<HydratedDocument<TEntity> | null> {
    const query = this.model.findById(id);
    this.applyReadOptions(query, options);
    return query.exec();
  }

  public async findOne(
    filter: FilterOptions<TEntity>,
    options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>,
  ): Promise<HydratedDocument<TEntity> | null> {
    const query = this.model.findOne(QueryBuilder.buildFilter(filter));
    this.applyReadOptions(query, options);
    return query.exec();
  }

  public async findMany(
    options?: RepositoryOptions<TEntity>,
  ): Promise<PaginationResult<HydratedDocument<TEntity>>> {
    const pagination = PaginationHelper.create(options?.pagination);
    const query = this.model.find(QueryBuilder.buildFilter(options?.filter));

    this.applyReadOptions(query, options);
    query
      .skip(pagination.offset)
      .limit(pagination.limit)
      .sort(QueryBuilder.buildSort(options?.sort));

    const [data, total] = await Promise.all([query.exec(), this.count(options?.filter)]);

    return PaginationHelper.createResult(data, pagination, total);
  }

  public async exists(filter: FilterOptions<TEntity>): Promise<boolean> {
    return (await this.model.exists(QueryBuilder.buildFilter(filter)).exec()) !== null;
  }

  public async count(filter?: FilterOptions<TEntity>): Promise<number> {
    return this.model.countDocuments(QueryBuilder.buildFilter(filter)).exec();
  }

  private applyReadOptions(
    query: ReturnType<Model<TEntity>['find']> | ReturnType<Model<TEntity>['findOne']>,
    options?: Omit<RepositoryOptions<TEntity>, 'filter' | 'pagination' | 'sort'>,
  ): void {
    if (options?.projection !== undefined) {
      query.select(options.projection);
    }

    if (options?.population !== undefined) {
      query.populate(options.population);
    }
  }

  private async execute<TResult>(
    operation: () => Promise<TResult>,
    operationName: string,
  ): Promise<TResult> {
    try {
      return await operation();
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (this.isDuplicateKeyError(error)) {
        throw new DuplicateEntityException(this.entityName);
      }

      throw new PersistenceException(`Unable to ${operationName} ${this.entityName}.`);
    }
  }

  private isDuplicateKeyError(error: unknown): boolean {
    return typeof error === 'object' && error !== null && 'code' in error && error.code === 11_000;
  }
}
