import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'StadiumSphere FC' })
  @IsString()
  public name!: string;

  @ApiProperty({ example: 'sport-id' })
  @IsString()
  public sportId!: string;

  @ApiProperty({ example: 'Football' })
  @IsString()
  public sportName!: string;
}

export class UpdateTeamDto {
  @ApiPropertyOptional({ example: 'StadiumSphere FC' })
  @IsOptional()
  @IsString()
  public name?: string;

  @ApiPropertyOptional({ example: 'sport-id' })
  @IsOptional()
  @IsString()
  public sportId?: string;

  @ApiPropertyOptional({ example: 'Football' })
  @IsOptional()
  @IsString()
  public sportName?: string;
}
