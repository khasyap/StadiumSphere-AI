import { Sport, Team, UniqueEntityId } from '../../domain';
import { TeamPersistenceMapper } from './team.persistence-mapper';

describe('TeamPersistenceMapper', () => {
  const mapper = new TeamPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const team = mapper.toDomain({
      id: 'team-1',
      name: 'StadiumSphere FC',
      sportId: 'sport-1',
      sportName: 'Football',
    });

    expect(team).toBeInstanceOf(Team);
    expect(team.toJSON()).toMatchObject({ id: 'team-1', name: 'StadiumSphere FC' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const team = new Team(
      { name: 'StadiumSphere FC', sport: new Sport({ name: 'Football' }, new UniqueEntityId('sport-1')) },
      new UniqueEntityId('team-1'),
    );

    expect(mapper.toPersistence(team)).toEqual({
      name: 'StadiumSphere FC',
      sportId: 'sport-1',
      sportName: 'Football',
    });
  });
});
