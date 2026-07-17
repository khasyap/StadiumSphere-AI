import { Query } from './query';

describe('Query', () => {
  it('captures immutable query criteria', () => {
    const query = new Query({ page: 1, search: 'stadium' });

    expect(query.criteria).toEqual({ page: 1, search: 'stadium' });
    expect(Object.isFrozen(query.criteria)).toBe(true);
  });
});
