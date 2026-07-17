import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'StadiumSphere Sports' })
  @IsString()
  public name!: string;
}

export class UpdateOrganizationDto {
  @ApiPropertyOptional({ example: 'StadiumSphere Sports' })
  @IsOptional()
  @IsString()
  public name?: string;
}
