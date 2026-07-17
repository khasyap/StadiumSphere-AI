import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Users')
@Controller('users')
export class UserController extends ResourceController<CreateUserDto, UpdateUserDto, unknown> {
  public constructor(
    @Inject(USER_APPLICATION_SERVICE)
    service: RestApplicationService<CreateUserDto, UpdateUserDto, unknown>,
  ) {
    super(service, 'User');
  }

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'Users retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: 200, description: 'User retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'User created.' })
  public create(@Body() dto: CreateUserDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }
}
