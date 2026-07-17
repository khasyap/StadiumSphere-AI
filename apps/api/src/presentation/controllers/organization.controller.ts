import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ORGANIZATION_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateOrganizationDto, UpdateOrganizationDto } from '../dto/organization.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController extends ResourceController<
  CreateOrganizationDto,
  UpdateOrganizationDto,
  unknown
> {
  public constructor(
    @Inject(ORGANIZATION_APPLICATION_SERVICE)
    service: RestApplicationService<CreateOrganizationDto, UpdateOrganizationDto, unknown>,
  ) {
    super(service, 'Organization');
  }

  @Get()
  @ApiOperation({ summary: 'List organizations' })
  @ApiResponse({ status: 200, description: 'Organizations retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organization' })
  @ApiResponse({ status: 200, description: 'Organization retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create an organization' })
  @ApiResponse({ status: 201, description: 'Organization created.' })
  public create(@Body() dto: CreateOrganizationDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({ status: 200, description: 'Organization updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateOrganizationDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization' })
  @ApiResponse({ status: 200, description: 'Organization deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
