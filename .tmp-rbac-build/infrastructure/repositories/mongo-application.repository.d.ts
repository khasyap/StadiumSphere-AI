import type { ApplicationRepository } from '../../application';
import type { UniqueEntityId } from '../../domain';
import type { FilterOptions } from '../persistence';
import type { PersistenceMapper } from '../mappers/persistence-mapper.interface';
import type { Model } from 'mongoose';
export declare abstract class MongoApplicationRepository<TDomain, TPersistence extends object> implements ApplicationRepository<TDomain> {
    private readonly mapper;
    private readonly repository;
    protected constructor(model: Model<TPersistence>, entityName: string, mapper: PersistenceMapper<TDomain, TPersistence>);
    create(entity: TDomain): Promise<TDomain>;
    delete(id: UniqueEntityId): Promise<void>;
    protected exists(filter: FilterOptions<TPersistence>): Promise<boolean>;
    findAll(): Promise<readonly TDomain[]>;
    findById(id: UniqueEntityId): Promise<TDomain | null>;
    protected findOne(filter: FilterOptions<TPersistence>): Promise<TDomain | null>;
    update(id: UniqueEntityId, entity: TDomain): Promise<TDomain>;
    private mapToDomain;
}
