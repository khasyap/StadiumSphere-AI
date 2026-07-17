import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

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
  @IsString()
  public name!: string;

  @ApiPropertyOptional({ example: '1 Stadium Way' })
  @IsOptional()
  @IsString()
  public addressLine1?: string;

  @ApiPropertyOptional({ example: 'Chennai' })
  @IsOptional()
  @IsString()
  public city?: string;

  @ApiPropertyOptional({ example: 'India' })
  @IsOptional()
  @IsString()
  public country?: string;

  @ApiPropertyOptional({ example: '600001' })
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
  @IsOptional()
  @IsString()
  public name?: string;
}
