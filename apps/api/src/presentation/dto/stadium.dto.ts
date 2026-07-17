import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({ example: 50000 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  public capacity!: number;

  @ApiProperty({ example: 'StadiumSphere Arena' })
  @IsString()
  public name!: string;
}

export class UpdateStadiumDto {
  @ApiPropertyOptional({ example: 50000 })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  public capacity?: number;

  @ApiPropertyOptional({ example: 'StadiumSphere Arena' })
  @IsOptional()
  @IsString()
  public name?: string;
}
