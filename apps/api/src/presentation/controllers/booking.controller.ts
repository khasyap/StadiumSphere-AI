import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BOOKING_APPLICATION_SERVICE } from '../../application';
import type { RestApplicationService } from '../../application';
import { CreateBookingDto, UpdateBookingDto } from '../dto/booking.dto';
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
    service: RestApplicationService<CreateBookingDto, UpdateBookingDto, unknown>,
  ) {
    super(service, 'Booking');
  }

  @Get()
  @ApiOperation({ summary: 'List booking placeholders' })
  @ApiResponse({ status: 200, description: 'Bookings retrieved.' })
  public list(): Promise<SuccessResponse<readonly unknown[]>> {
    return this.listResources();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking placeholder' })
  @ApiResponse({ status: 200, description: 'Booking retrieved.' })
  public getById(@Param('id') id: string): Promise<SuccessResponse<unknown>> {
    return this.getResource(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a booking placeholder' })
  @ApiResponse({ status: 201, description: 'Booking created.' })
  public create(@Body() dto: CreateBookingDto): Promise<SuccessResponse<unknown>> {
    return this.createResource(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking placeholder' })
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
}
