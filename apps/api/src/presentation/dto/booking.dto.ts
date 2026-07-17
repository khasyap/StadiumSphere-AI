import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'BOOK-2026-0001' })
  @IsString()
  public reference!: string;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ example: 'BOOK-2026-0001' })
  @IsOptional()
  @IsString()
  public reference?: string;
}
