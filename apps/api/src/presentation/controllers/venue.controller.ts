import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { VENUE_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateVenueDto, UpdateVenueDto } from '../dto/venue.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Venues')
@Controller('venues')
export class VenueController extends ResourceController<CreateVenueDto, UpdateVenueDto, unknown> {
  public constructor(
    @Inject(VENUE_APPLICATION_SERVICE)
    service: RestApplicationService<CreateVenueDto, UpdateVenueDto, unknown>,
  ) {
    super(service, 'Venue');
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
}
