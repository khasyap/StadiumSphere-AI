import type { UniqueEntityId } from '../../domain';

export interface ApplicationRepository<TEntity> {
  findAll(): Promise<readonly TEntity[]>;
  findById(id: UniqueEntityId): Promise<TEntity | null>;
}
