import { PaginationHelper } from './pagination.helper';

describe('PaginationHelper', () => {
  it('calculates page offset and metadata', () => {
    const pagination = PaginationHelper.create({ limit: 10, page: 2 });
    const result = PaginationHelper.createResult(['first', 'second'], pagination, 21);

    expect(pagination).toEqual({ limit: 10, offset: 10, page: 2 });
    expect(result).toEqual({
      data: ['first', 'second'],
      hasNext: true,
      hasPrevious: true,
      limit: 10,
      offset: 10,
      page: 2,
      total: 21,
      totalPages: 3,
    });
  });

  it('rejects invalid page values', () => {
    expect(() => PaginationHelper.create({ page: 0 })).toThrow(RangeError);
    expect(() => PaginationHelper.create({ limit: 0 })).toThrow(RangeError);
  });
});
