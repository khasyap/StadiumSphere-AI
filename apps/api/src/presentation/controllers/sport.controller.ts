import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SPORT_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { CreateSportDto, UpdateSportDto } from '../dto/sport.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
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
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List sports' })
  @ApiResponse({ status: 200, description: 'Sports retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a sport' })
  @ApiResponse({ status: 200, description: 'Sport retrieved.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a sport' })
  @ApiResponse({ status: 201, description: 'Sport created.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public create(@Body() dto: CreateSportDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a sport' })
  @ApiResponse({ status: 200, description: 'Sport updated.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateSportDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a sport' })
  @ApiResponse({ status: 200, description: 'Sport deleted.' })
  @ApiForbiddenResponse({ description: 'Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
