import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({ example: 13.0827 })
  @IsNumber()
  @Max(90)
  @Min(-90)
  @Type(() => Number)
  public latitude!: number;

  @ApiProperty({ example: 80.2707 })
  @IsNumber()
  @Max(180)
  @Min(-180)
  @Type(() => Number)
  public longitude!: number;

  @ApiProperty({ example: 'StadiumSphere Arena' })
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @ApiPropertyOptional({ example: '1 Stadium Way' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public addressLine1?: string;

  @ApiPropertyOptional({ example: 'Chennai' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public city?: string;

  @ApiPropertyOptional({ example: 'India' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public country?: string;

  @ApiPropertyOptional({ example: '600001' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public postalCode?: string;
}

export class UpdateVenueDto {
  @ApiPropertyOptional({ example: 13.0827 })
  @IsNumber()
  @IsOptional()
  @Max(90)
  @Min(-90)
  @Type(() => Number)
  public latitude?: number;

  @ApiPropertyOptional({ example: 80.2707 })
  @IsNumber()
  @IsOptional()
  @Max(180)
  @Min(-180)
  @Type(() => Number)
  public longitude?: number;

  @ApiPropertyOptional({ example: 'StadiumSphere Arena' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public name?: string;
}

export class ReserveVenueDto {
  @ApiProperty({ example: '2026-07-20T20:00:00.000Z', format: 'date-time' })
  @IsDate()
  @Type(() => Date)
  public endsAt!: Date;

  @ApiProperty({ example: '2026-07-20T18:00:00.000Z', format: 'date-time' })
  @IsDate()
  @Type(() => Date)
  public startsAt!: Date;
}
