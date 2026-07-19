import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'event-id' })
  @IsNotEmpty()
  @IsString()
  public eventId!: string;

  @ApiProperty({ example: 'BOOK-2026-0001' })
  @IsNotEmpty()
  @IsString()
  public reference!: string;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ example: 'event-id' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public eventId?: string;

  @ApiPropertyOptional({ example: 'BOOK-2026-0001' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public reference?: string;
}
