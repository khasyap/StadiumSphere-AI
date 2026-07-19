import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { VENUE_APPLICATION_SERVICE, VenueApplicationService } from '../../application';
import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { CreateVenueDto, ReserveVenueDto, UpdateVenueDto } from '../dto/venue.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Venues')
@Controller('venues')
export class VenueController extends ResourceController<CreateVenueDto, UpdateVenueDto, unknown> {
  public constructor(
    @Inject(VENUE_APPLICATION_SERVICE)
    private readonly workflowService: VenueWorkflowService,
  ) {
    super(workflowService, 'Venue');
  }

  @Get()
  @ApiOperation({ summary: 'List venues' })
  @ApiResponse({ status: 200, description: 'Venues retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a venue' })
  @ApiResponse({ status: 200, description: 'Venue retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a venue' })
  @ApiResponse({ status: 201, description: 'Venue created.' })
  public create(@Body() dto: CreateVenueDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a venue' })
  @ApiResponse({ status: 200, description: 'Venue updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateVenueDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a venue' })
  @ApiResponse({ status: 200, description: 'Venue deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }

  @Post(':id/reserve')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reserve a venue (Staff, Manager, or Admin)' })
  @ApiResponse({ status: 200, description: 'Venue reserved.' })
  @ApiForbiddenResponse({ description: 'Staff, Manager, or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async reserve(
    @Param('id') id: string,
    @Body() dto: ReserveVenueDto,
  ): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse(
      'Venue reserved.',
      await this.workflowService.reserve(id, dto.startsAt, dto.endsAt),
    );
  }

  @Post(':id/release')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Release a venue reservation (Staff, Manager, or Admin)' })
  @ApiResponse({ status: 200, description: 'Venue released.' })
  @ApiForbiddenResponse({ description: 'Staff, Manager, or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async release(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Venue released.', await this.workflowService.release(id));
  }

  @Post(':id/maintenance')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Place a venue into maintenance (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Venue placed into maintenance.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async maintenance(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse(
      'Venue placed into maintenance.',
      await this.workflowService.maintenance(id),
    );
  }

  @Post(':id/open')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Open a venue (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Venue opened.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async open(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Venue opened.', await this.workflowService.open(id));
  }

  @Post(':id/close')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Close a venue (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Venue closed.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async close(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Venue closed.', await this.workflowService.close(id));
  }
}

type VenueWorkflowService = RestApplicationService<CreateVenueDto, UpdateVenueDto, unknown> &
  Pick<VenueApplicationService, 'close' | 'maintenance' | 'open' | 'release' | 'reserve'>;
