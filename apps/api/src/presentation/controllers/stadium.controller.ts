import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { STADIUM_APPLICATION_SERVICE, StadiumApplicationService } from '../../application';
import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { CreateStadiumDto, UpdateStadiumDto } from '../dto/stadium.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Stadiums')
@Controller('stadiums')
export class StadiumController extends ResourceController<
  CreateStadiumDto,
  UpdateStadiumDto,
  unknown
> {
  public constructor(
    @Inject(STADIUM_APPLICATION_SERVICE)
    private readonly workflowService: StadiumWorkflowService,
  ) {
    super(workflowService, 'Stadium');
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List stadiums (authenticated)' })
  @ApiResponse({ status: 200, description: 'Stadiums retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stadium' })
  @ApiResponse({ status: 200, description: 'Stadium retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a stadium (Manager or Admin)' })
  @ApiResponse({ status: 201, description: 'Stadium created.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public create(@Body() dto: CreateStadiumDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a stadium' })
  @ApiResponse({ status: 200, description: 'Stadium updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateStadiumDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a stadium (Admin only)' })
  @ApiResponse({ status: 200, description: 'Stadium deleted.' })
  @ApiForbiddenResponse({ description: 'Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }

  @Post(':id/open')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Open a stadium (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Stadium opened.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async open(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Stadium opened.', await this.workflowService.open(id));
  }

  @Post(':id/close')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Close a stadium (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Stadium closed.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async close(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Stadium closed.', await this.workflowService.close(id));
  }

  @Post(':id/maintenance')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Place a stadium into maintenance (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Stadium placed into maintenance.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async maintenance(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse(
      'Stadium placed into maintenance.',
      await this.workflowService.maintenance(id),
    );
  }
}

type StadiumWorkflowService = RestApplicationService<CreateStadiumDto, UpdateStadiumDto, unknown> &
  Pick<StadiumApplicationService, 'close' | 'maintenance' | 'open'>;
