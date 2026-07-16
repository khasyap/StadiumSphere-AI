export interface HealthResponse {
  readonly database: 'connected' | 'disconnected';
  readonly redis: 'connected' | 'disconnected';
  readonly service: 'api';
  readonly status: 'degraded' | 'ok';
  readonly timestamp: string;
  readonly version: '0.1.0';
}
