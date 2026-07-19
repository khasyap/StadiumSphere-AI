export type SortDirection = 'asc' | 'desc';
export type SortOptions<TEntity extends object> = Readonly<Partial<Record<Extract<keyof TEntity, string>, SortDirection>>>;
