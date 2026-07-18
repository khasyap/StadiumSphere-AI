import { UniqueEntityId } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import type { ApplicationRepository } from '../interfaces/application-repository.interface';
import type { RestApplicationService } from '../interfaces/rest-application-service.interface';

interface SerializableEntity {
  toJSON(): Readonly<object>;
}

export abstract class CrudApplicationService<
  TEntity extends SerializableEntity,
  TCreate extends object,
  TUpdate extends object,
> implements RestApplicationService<TCreate, TUpdate, Record<string, unknown>> {
  protected constructor(protected readonly repository: ApplicationRepository<TEntity>) {}

  public async create(command: TCreate): Promise<Record<string, unknown>> {
    return this.toResponse(await this.repository.create(this.createEntity(command)));
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(new UniqueEntityId(id));
  }

  public async findAll(): Promise<readonly Record<string, unknown>[]> {
    return (await this.repository.findAll()).map((entity) => this.toResponse(entity));
  }

  public async findById(id: string): Promise<Record<string, unknown>> {
    return this.toResponse(await this.getEntity(id));
  }

  public async update(id: string, command: TUpdate): Promise<Record<string, unknown>> {
    const entity = await this.getEntity(id);
    return this.toResponse(
      await this.repository.update(new UniqueEntityId(id), this.updateEntity(entity, command)),
    );
  }

  protected abstract createEntity(command: TCreate): TEntity;

  protected abstract updateEntity(current: TEntity, command: TUpdate): TEntity;

  private async getEntity(id: string): Promise<TEntity> {
    const entity = await this.repository.findById(new UniqueEntityId(id));

    if (entity === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return entity;
  }

  private toResponse(entity: TEntity): Record<string, unknown> {
    return entity.toJSON() as Record<string, unknown>;
  }
}
