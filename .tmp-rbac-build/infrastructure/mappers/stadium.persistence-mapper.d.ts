import { Stadium } from '../../domain';
import type { StadiumPersistence } from '../schemas/stadium.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class StadiumPersistenceMapper implements PersistenceMapper<Stadium, StadiumPersistence> {
    toDomain(document: PersistenceRecord<StadiumPersistence>): Stadium;
    toPersistence(entity: Stadium): Partial<StadiumPersistence>;
}
