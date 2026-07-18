import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SPORT_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateSportDto, UpdateSportDto } from '../dto/sport.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Sports')
@Controller('sports')
export class SportController extends ResourceController<CreateSportDto, UpdateSportDto, unknown> {
  public constructor(
    @Inject(SPORT_APPLICATION_SERVICE)
    service: RestApplicationService<CreateSportDto, UpdateSportDto, unknown>,
  ) {
    super(service, 'Sport');
  }

  @Get()
  @ApiOperation({ summary: 'List sports' })
  @ApiResponse({ status: 200, description: 'Sports retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sport' })
  @ApiResponse({ status: 200, description: 'Sport retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a sport' })
  @ApiResponse({ status: 201, description: 'Sport created.' })
  public create(@Body() dto: CreateSportDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a sport' })
  @ApiResponse({ status: 200, description: 'Sport updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateSportDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sport' })
  @ApiResponse({ status: 200, description: 'Sport deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
