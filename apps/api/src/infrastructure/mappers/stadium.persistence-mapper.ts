import { Capacity, Stadium, StadiumStatus, UniqueEntityId } from '../../domain';
import type { StadiumPersistence } from '../schemas/stadium.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class StadiumPersistenceMapper implements PersistenceMapper<Stadium, StadiumPersistence> {
  public toDomain(document: PersistenceRecord<StadiumPersistence>): Stadium {
    return new Stadium(
      {
        capacity: new Capacity(document.capacity),
        name: document.name,
        status: document.status ?? StadiumStatus.AVAILABLE,
      },
      new UniqueEntityId(document.id),
    );
  }

  public toPersistence(entity: Stadium): Partial<StadiumPersistence> {
    const stadium = entity.toJSON();
    return { capacity: stadium.capacity.value, name: stadium.name, status: stadium.status };
  }
}
