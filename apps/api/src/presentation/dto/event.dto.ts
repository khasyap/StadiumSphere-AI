import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: '2026-07-18T20:00:00.000Z', format: 'date-time' })
  @IsDate()
  @Type(() => Date)
  public endsAt!: Date;

  @ApiProperty({ example: 'Championship Final' })
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @ApiProperty({ example: '2026-07-18T18:00:00.000Z', format: 'date-time' })
  @IsDate()
  @Type(() => Date)
  public startsAt!: Date;
}

export class UpdateEventDto {
  @ApiPropertyOptional({ example: '2026-07-18T20:00:00.000Z', format: 'date-time' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  public endsAt?: Date;

  @ApiPropertyOptional({ example: 'Championship Final' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public name?: string;

  @ApiPropertyOptional({ example: '2026-07-18T18:00:00.000Z', format: 'date-time' })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  public startsAt?: Date;
}
