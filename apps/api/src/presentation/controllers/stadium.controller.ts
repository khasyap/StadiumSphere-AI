import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { STADIUM_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateStadiumDto, UpdateStadiumDto } from '../dto/stadium.dto';
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
    service: RestApplicationService<CreateStadiumDto, UpdateStadiumDto, unknown>,
  ) {
    super(service, 'Stadium');
  }

  @Get()
  @ApiOperation({ summary: 'List stadiums' })
  @ApiResponse({ status: 200, description: 'Stadiums retrieved.' })
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
  @ApiOperation({ summary: 'Create a stadium' })
  @ApiResponse({ status: 201, description: 'Stadium created.' })
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
  @ApiOperation({ summary: 'Delete a stadium' })
  @ApiResponse({ status: 200, description: 'Stadium deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
