import { UniqueEntityId } from '../../domain';
import { ApplicationEntityNotFoundException } from '../exceptions/application-entity-not-found.exception';
import type { ApplicationRepository } from '../interfaces/application-repository.interface';
import type { Mapper } from '../interfaces/mapper.interface';

export class EntityApplicationService<TEntity, TDto> {
  public constructor(
    private readonly repository: ApplicationRepository<TEntity>,
    private readonly mapper: Mapper<TEntity, TDto>,
  ) {}

  public async findAll(): Promise<readonly TDto[]> {
    const entities = await this.repository.findAll();
    return entities.map((entity) => this.mapper.toDto(entity));
  }

  public async findById(id: string): Promise<TDto> {
    const entity = await this.repository.findById(new UniqueEntityId(id));

    if (entity === null) {
      throw new ApplicationEntityNotFoundException(id);
    }

    return this.mapper.toDto(entity);
  }
}
