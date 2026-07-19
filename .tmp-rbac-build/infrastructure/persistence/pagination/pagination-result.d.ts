export interface PaginationResult<TEntity> {
    readonly data: readonly TEntity[];
    readonly hasNext: boolean;
    readonly hasPrevious: boolean;
    readonly limit: number;
    readonly offset: number;
    readonly page: number;
    readonly total: number;
    readonly totalPages: number;
}
