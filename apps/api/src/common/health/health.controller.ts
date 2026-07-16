import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// Nest reflection needs this runtime symbol to resolve constructor injection.
import { HealthService } from './health.service';
import type { HealthResponse } from './health.types';

@ApiTags('platform')
@Controller('health')
export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Get API foundation health' })
  @ApiOkResponse({ description: 'The API runtime is available.' })
  public getHealth(): HealthResponse {
    return this.healthService.getHealth();
  }
}
