import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSportDto {
  @ApiProperty({ example: 'Football' })
  @IsNotEmpty()
  @IsString()
  public name!: string;
}

export class UpdateSportDto {
  @ApiPropertyOptional({ example: 'Football' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public name?: string;
}
