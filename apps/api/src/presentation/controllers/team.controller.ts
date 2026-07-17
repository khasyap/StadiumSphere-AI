import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TEAM_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateTeamDto, UpdateTeamDto } from '../dto/team.dto';
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
  @ApiOperation({ summary: 'List teams' })
  @ApiResponse({ status: 200, description: 'Teams retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a team' })
  @ApiResponse({ status: 200, description: 'Team retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a team' })
  @ApiResponse({ status: 201, description: 'Team created.' })
  public create(@Body() dto: CreateTeamDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({ status: 200, description: 'Team updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateTeamDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team' })
  @ApiResponse({ status: 200, description: 'Team deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
