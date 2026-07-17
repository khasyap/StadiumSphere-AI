import { Sport, UniqueEntityId } from '../../domain';
import type { SportPersistence } from '../schemas/sport.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class SportPersistenceMapper implements PersistenceMapper<Sport, SportPersistence> {
  public toDomain(document: PersistenceRecord<SportPersistence>): Sport {
    return new Sport({ name: document.name }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: Sport): Partial<SportPersistence> {
    return { name: entity.toJSON().name };
  }
}
