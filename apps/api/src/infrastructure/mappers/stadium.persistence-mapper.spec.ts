import { Capacity, Stadium, UniqueEntityId } from '../../domain';
import { StadiumPersistenceMapper } from './stadium.persistence-mapper';

describe('StadiumPersistenceMapper', () => {
  const mapper = new StadiumPersistenceMapper();

  it('maps persistence fields into a domain entity', () => {
    const stadium = mapper.toDomain({ id: 'stadium-1', capacity: 50000, name: 'StadiumSphere Arena' });

    expect(stadium).toBeInstanceOf(Stadium);
    expect(stadium.toJSON()).toMatchObject({ id: 'stadium-1', name: 'StadiumSphere Arena' });
  });

  it('maps a domain entity into persistence fields without DTO concerns', () => {
    const stadium = new Stadium(
      { capacity: new Capacity(50000), name: 'StadiumSphere Arena' },
      new UniqueEntityId('stadium-1'),
    );

    expect(mapper.toPersistence(stadium)).toEqual({ capacity: 50000, name: 'StadiumSphere Arena' });
  });
});
