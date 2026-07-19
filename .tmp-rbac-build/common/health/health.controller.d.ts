import { HealthService } from './health.service';
import type { HealthResponse } from './health.types';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getHealth(): HealthResponse;
}
