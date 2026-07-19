import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ActivityTimelineService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';

@ApiTags('platform')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
@Controller('activity')
export class ActivityController {
  public constructor(@Inject(ActivityTimelineService) private readonly activityService: ActivityTimelineService) {}

  @Get()
  @ApiOperation({ summary: 'Get recent platform activity' })
  @ApiResponse({ status: 200, description: 'Recent activity retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public recent(): SuccessResponse<unknown> {
    return new SuccessResponse('Recent platform activity retrieved.', this.activityService.recent());
  }
}
