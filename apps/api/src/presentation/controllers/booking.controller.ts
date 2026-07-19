import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { BOOKING_APPLICATION_SERVICE, BookingApplicationService } from '../../application';
import type { RestApplicationService } from '../../application';
import { UserRole } from '../../domain';
import { Roles } from '../decorators/roles.decorator';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
import { JwtAuthenticationGuard } from '../guards/jwt-authentication.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SuccessResponse } from '../responses/success.response';
import { ResourceController } from './resource.controller';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController extends ResourceController<
  CreateBookingDto,
  UpdateBookingDto,
  unknown
> {
  public constructor(
    @Inject(BOOKING_APPLICATION_SERVICE)
    private readonly workflowService: BookingWorkflowService,
  ) {
    super(workflowService, 'Booking');
  }

  @Get()
  @ApiOperation({ summary: 'List bookings' })
  @ApiResponse({ status: 200, description: 'Bookings retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking' })
  @ApiResponse({ status: 200, description: 'Booking retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a booking' })
  @ApiResponse({ status: 201, description: 'Booking created.' })
  public create(@Body() dto: CreateBookingDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({ status: 200, description: 'Booking updated.' })
  public update(
    @Param('id') id: string,
    @Body() dto: UpdateBookingDto,
  ): Promise<SuccessResponse<unknown>> {
    return this.updateResource(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking placeholder' })
  @ApiResponse({ status: 200, description: 'Booking deleted.' })
  public delete(@Param('id') id: string): Promise<SuccessResponse<undefined>> {
    return this.deleteResource(id);
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirm a booking (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Booking confirmed.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async confirm(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Booking confirmed.', await this.workflowService.confirm(id));
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a booking (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Booking cancelled.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async cancel(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Booking cancelled.', await this.workflowService.cancel(id));
  }

  @Post(':id/check-in')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check in a booking (Staff, Manager, or Admin)' })
  @ApiResponse({ status: 200, description: 'Booking checked in.' })
  @ApiForbiddenResponse({ description: 'Staff, Manager, or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async checkIn(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Booking checked in.', await this.workflowService.checkIn(id));
  }

  @Post(':id/complete')
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete a booking (Manager or Admin)' })
  @ApiResponse({ status: 200, description: 'Booking completed.' })
  @ApiForbiddenResponse({ description: 'Manager or Admin role is required.' })
  @ApiUnauthorizedResponse({ description: 'A valid access token is required.' })
  public async complete(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return new SuccessResponse('Booking completed.', await this.workflowService.complete(id));
  }
}

type BookingWorkflowService = RestApplicationService<CreateBookingDto, UpdateBookingDto, unknown> &
  Pick<BookingApplicationService, 'cancel' | 'checkIn' | 'complete' | 'confirm'>;
