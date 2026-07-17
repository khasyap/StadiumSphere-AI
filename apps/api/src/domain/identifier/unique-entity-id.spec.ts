import { UniqueEntityId } from './unique-entity-id';

describe('UniqueEntityId', () => {
  it('compares explicitly supplied values strongly', () => {
    expect(new UniqueEntityId('user-1').equals(new UniqueEntityId('user-1'))).toBe(true);
    expect(new UniqueEntityId('user-1').equals(new UniqueEntityId('user-2'))).toBe(false);
    expect(new UniqueEntityId('user-1').toString()).toBe('user-1');
  });

  it('rejects blank identifiers', () => {
    expect(() => new UniqueEntityId('   ')).toThrow(TypeError);
  });
});
