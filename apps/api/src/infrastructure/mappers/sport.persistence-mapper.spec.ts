import { Sport, UniqueEntityId } from '../../domain';
import { SportPersistenceMapper } from './sport.persistence-mapper';

describe('SportPersistenceMapper', () => {
  const mapper = new SportPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const sport = mapper.toDomain({ id: 'sport-1', name: 'Football' });

    expect(sport).toBeInstanceOf(Sport);
    expect(sport.toJSON()).toMatchObject({ id: 'sport-1', name: 'Football' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const sport = new Sport({ name: 'Football' }, new UniqueEntityId('sport-1'));

    expect(mapper.toPersistence(sport)).toEqual({ name: 'Football' });
  });
});
