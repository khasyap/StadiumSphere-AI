import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { TEAM_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { CreateTeamDto, UpdateTeamDto } from '../dto/team.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Teams')
@Controller('teams')
export class TeamController extends ResourceController<CreateTeamDto, UpdateTeamDto, unknown> {
  public constructor(
    @Inject(TEAM_APPLICATION_SERVICE)
    service: RestApplicationService<CreateTeamDto, UpdateTeamDto, unknown>,
  ) {
    super(service, 'Team');
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List teams' })
  @ApiResponse({ status: 200, description: 'Teams retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a team' })
  @ApiResponse({ status: 200, description: 'Team retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a team' })
  @ApiResponse({ status: 201, description: 'Team created.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public create(@Body() dto: CreateTeamDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({ status: 200, description: 'Team updated.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a team' })
  @ApiResponse({ status: 200, description: 'Team deleted.' })
  @ApiForbiddenResponse({ description: 'Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
