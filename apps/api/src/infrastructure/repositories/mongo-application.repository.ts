import type { ApplicationRepository } from '../../application';
import type { UniqueEntityId } from '../../domain';
import { BaseRepository } from '../persistence';
import type { FilterOptions } from '../persistence';
import type { PersistenceMapper, PersistenceRecord } from '../mappers/persistence-mapper.interface';
import type { HydratedDocument, Model } from 'mongoose';

class MongoRepositoryDelegate<TEntity extends object> extends BaseRepository<TEntity> {
  public constructor(model: Model<TEntity>, entityName: string) {
    super(model, entityName);
  }
}

export abstract class MongoApplicationRepository<
  TDomain,
  TPersistence extends object,
> implements ApplicationRepository<TDomain> {
  private readonly repository: MongoRepositoryDelegate<TPersistence>;

  protected constructor(
    model: Model<TPersistence>,
    entityName: string,
    private readonly mapper: PersistenceMapper<TDomain, TPersistence>,
  ) {
    this.repository = new MongoRepositoryDelegate(model, entityName);
  }

  public async create(entity: TDomain): Promise<TDomain> {
    const document = await this.repository.create(this.mapper.toPersistence(entity));
    return this.mapToDomain(document);
  }

  public async delete(id: UniqueEntityId): Promise<void> {
    await this.repository.delete(id.toString());
  }

  protected async exists(filter: FilterOptions<TPersistence>): Promise<boolean> {
    return this.repository.exists(filter);
  }

  public async findAll(): Promise<readonly TDomain[]> {
    const result = await this.repository.findMany({ pagination: { limit: 100 } });
    return result.data.map((document) => this.mapToDomain(document));
  }

  public async findById(id: UniqueEntityId): Promise<TDomain | null> {
    const document = await this.repository.findById(id.toString());
    return document === null ? null : this.mapToDomain(document);
  }

  protected async findOne(filter: FilterOptions<TPersistence>): Promise<TDomain | null> {
    const document = await this.repository.findOne(filter);
    return document === null ? null : this.mapToDomain(document);
  }

  public async update(id: UniqueEntityId, entity: TDomain): Promise<TDomain> {
    const document = await this.repository.update(id.toString(), {
      $set: this.mapper.toPersistence(entity),
    });
    return this.mapToDomain(document);
  }

  private mapToDomain(document: HydratedDocument<TPersistence>): TDomain {
    const persisted = document as HydratedDocument<TPersistence> & {
      _id: { toString(): string };
      id?: string;
    };

    return this.mapper.toDomain({
      ...(persisted as TPersistence),
      id: persisted.id ?? persisted._id.toString(),
    } as PersistenceRecord<TPersistence>);
  }
}
