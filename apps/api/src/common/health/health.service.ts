import { Injectable } from '@nestjs/common';

import type { HealthResponse } from './health.types';

@Injectable()
export class HealthService {
  public getHealth(): HealthResponse {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
