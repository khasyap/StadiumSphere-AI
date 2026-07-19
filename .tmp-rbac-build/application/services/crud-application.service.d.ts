import type { ApplicationRepository } from '../interfaces/application-repository.interface';
import type { RestApplicationService } from '../interfaces/rest-application-service.interface';
interface SerializableEntity {
    toJSON(): Readonly<object>;
}
export declare abstract class CrudApplicationService<TEntity extends SerializableEntity, TCreate extends object, TUpdate extends object> implements RestApplicationService<TCreate, TUpdate, Record<string, unknown>> {
    protected readonly repository: ApplicationRepository<TEntity>;
    protected constructor(repository: ApplicationRepository<TEntity>);
    create(command: TCreate): Promise<Record<string, unknown>>;
    delete(id: string): Promise<void>;
    findAll(): Promise<readonly Record<string, unknown>[]>;
    findById(id: string): Promise<Record<string, unknown>>;
    update(id: string, command: TUpdate): Promise<Record<string, unknown>>;
    protected abstract createEntity(command: TCreate): TEntity;
    protected abstract updateEntity(current: TEntity, command: TUpdate): TEntity;
    private getEntity;
    private toResponse;
}
export {};
