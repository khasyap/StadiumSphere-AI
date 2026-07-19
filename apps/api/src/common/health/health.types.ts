export interface HealthResponse {
  readonly apiVersion: 'v1';
  readonly database: 'connected' | 'disconnected';
  readonly environment: string;
  readonly redis: 'connected' | 'disconnected';
  readonly service: 'api';
  readonly status: 'degraded' | 'ok';
  readonly timestamp: string;
  readonly uptime: number;
  readonly version: '0.1.0';
}
