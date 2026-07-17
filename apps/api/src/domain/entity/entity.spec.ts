import { Entity } from './entity';
import { UniqueEntityId } from '../identifier/unique-entity-id';

class TestEntity extends Entity<{ name: string }> {
  public constructor(name: string, id?: UniqueEntityId) {
    super({ name }, id);
  }
}

describe('Entity', () => {
  it('uses its identifier for equality', () => {
    const id = new UniqueEntityId('entity-id');

    expect(new TestEntity('First', id).equals(new TestEntity('Second', id))).toBe(true);
    expect(new TestEntity('First', id).equals(new TestEntity('Second'))).toBe(false);
  });

  it('serializes its identifier and immutable properties', () => {
    expect(new TestEntity('Stadium', new UniqueEntityId('entity-id')).toJSON()).toEqual({
      id: 'entity-id',
      name: 'Stadium',
    });
  });
});
