import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { DashboardService, PlatformStatisticsService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';

@ApiTags('platform')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
@Controller()
export class DashboardController {
  public constructor(
    @Inject(DashboardService) private readonly dashboardService: DashboardService,
    @Inject(PlatformStatisticsService) private readonly statisticsService: PlatformStatisticsService,
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get platform dashboard aggregates' })
  @ApiResponse({ status: 200, description: 'Dashboard aggregates retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async dashboard(): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Platform dashboard retrieved.', await this.dashboardService.getDashboard());
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get platform statistics' })
  @ApiResponse({ status: 200, description: 'Platform statistics retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async statistics(): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Platform statistics retrieved.', await this.statisticsService.getStatistics());
  }
}
