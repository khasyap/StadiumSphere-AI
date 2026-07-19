import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { EVENT_APPLICATION_SERVICE, EventApplicationService } from '../../application';
import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Events')
@Controller('events')
export class EventController extends ResourceController<CreateEventDto, UpdateEventDto, unknown> {
  public constructor(
    @Inject(EVENT_APPLICATION_SERVICE)
    private readonly workflowService: EventWorkflowService,
  ) {
    super(workflowService, 'Event');
  }

  @Get()
  @ApiOperation({ summary: 'List events' })
  @ApiResponse({ status: 200, description: 'Events retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event' })
  @ApiResponse({ status: 200, description: 'Event retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: 201, description: 'Event created.' })
  public create(@Body() dto: CreateEventDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiResponse({ status: 200, description: 'Event updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiResponse({ status: 200, description: 'Event deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }

  @Post(':id/start')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start an event (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Event started.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async start(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Event started.', await this.workflowService.start(id));
  }

  @Post(':id/finish')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Finish an event (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Event finished.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async finish(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Event finished.', await this.workflowService.finish(id));
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel an event (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Event cancelled.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async cancel(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Event cancelled.', await this.workflowService.cancel(id));
  }
}

type EventWorkflowService = RestApplicationService<CreateEventDto, UpdateEventDto, unknown> &
  Pick<EventApplicationService, 'cancel' | 'finish' | 'start'>;
