export interface ApiResponse<TData> {
  readonly data: TData;
  readonly correlationId: string;
}

export interface PaginationMetadata {
  readonly page: number;
  readonly pageSize: number;
  readonly totalRecords: number;
  readonly totalPages: number;
}

export type ServiceHealthStatus = 'healthy' | 'unhealthy';
