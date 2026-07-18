import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'StadiumSphere Sports' })
  @IsNotEmpty()
  @IsString()
  public name!: string;
}

export class UpdateOrganizationDto {
  @ApiPropertyOptional({ example: 'StadiumSphere Sports' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public name?: string;
}
