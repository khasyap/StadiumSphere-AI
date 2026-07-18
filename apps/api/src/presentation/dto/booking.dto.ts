import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'BOOK-2026-0001' })
  @IsNotEmpty()
  @IsString()
  public reference!: string;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ example: 'BOOK-2026-0001' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public reference?: string;
}
