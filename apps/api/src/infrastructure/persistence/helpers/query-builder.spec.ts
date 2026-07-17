import { QueryBuilder } from './query-builder';

interface QueryEntity {
  readonly createdAt: Date;
  readonly name: string;
}

describe('QueryBuilder', () => {
  it('retains generic MongoDB filters', () => {
    const filter = { name: 'Arena' };

    expect(QueryBuilder.buildFilter<QueryEntity>(filter)).toEqual(filter);
  });

  it('converts multiple typed sort fields to MongoDB directions', () => {
    expect(
      QueryBuilder.buildSort<QueryEntity>({
        createdAt: 'desc',
        name: 'asc',
      }),
    ).toEqual({ createdAt: -1, name: 1 });
  });
});
