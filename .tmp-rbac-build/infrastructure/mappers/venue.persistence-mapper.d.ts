import { Venue } from '../../domain';
import type { VenuePersistence } from '../schemas/venue.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class VenuePersistenceMapper implements PersistenceMapper<Venue, VenuePersistence> {
    toDomain(document: PersistenceRecord<VenuePersistence>): Venue;
    toPersistence(entity: Venue): Partial<VenuePersistence>;
}
