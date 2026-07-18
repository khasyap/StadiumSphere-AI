import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EVENT_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateEventDto, UpdateEventDto } from '../dto/event.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Events')
@Controller('events')
export class EventController extends ResourceController<CreateEventDto, UpdateEventDto, unknown> {
  public constructor(
    @Inject(EVENT_APPLICATION_SERVICE)
    service: RestApplicationService<CreateEventDto, UpdateEventDto, unknown>,
  ) {
    super(service, 'Event');
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
}
