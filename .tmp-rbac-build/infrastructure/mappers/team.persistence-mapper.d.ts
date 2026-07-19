import { Team } from '../../domain';
import type { TeamPersistence } from '../schemas/team.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';
export declare class TeamPersistenceMapper implements PersistenceMapper<Team, TeamPersistence> {
    toDomain(document: PersistenceRecord<TeamPersistence>): Team;
    toPersistence(entity: Team): Partial<TeamPersistence>;
}
