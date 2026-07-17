import { Sport, Team, UniqueEntityId } from '../../domain';
import type { TeamPersistence } from '../schemas/team.schema';
import type { PersistenceMapper, PersistenceRecord } from './persistence-mapper.interface';

export class TeamPersistenceMapper implements PersistenceMapper<Team, TeamPersistence> {
  public toDomain(document: PersistenceRecord<TeamPersistence>): Team {
    const sport = new Sport({ name: document.sportName }, new UniqueEntityId(document.sportId));

    return new Team({ name: document.name, sport }, new UniqueEntityId(document.id));
  }

  public toPersistence(entity: Team): Partial<TeamPersistence> {
    const team = entity.toJSON();
    const sport = team.sport.toJSON();

    return { name: team.name, sportId: sport.id, sportName: sport.name };
  }
}
