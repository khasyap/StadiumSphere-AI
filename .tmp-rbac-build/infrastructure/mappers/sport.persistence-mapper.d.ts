import { Sport } from '../../domain';
import type { SportPersistence } from '../schemas/sport.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class SportPersistenceMapper implements PersistenceMapper<Sport, SportPersistence> {
    toDomain(document: PersistenceRecord<SportPersistence>): Sport;
    toPersistence(entity: Sport): Partial<SportPersistence>;
}
