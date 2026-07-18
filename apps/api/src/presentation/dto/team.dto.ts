import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'StadiumSphere FC' })
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @ApiProperty({ example: 'sport-id' })
  @IsNotEmpty()
  @IsString()
  public sportId!: string;

  @ApiProperty({ example: 'Football' })
  @IsNotEmpty()
  @IsString()
  public sportName!: string;
}

export class UpdateTeamDto {
  @ApiPropertyOptional({ example: 'StadiumSphere FC' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public name?: string;

  @ApiPropertyOptional({ example: 'sport-id' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public sportId?: string;

  @ApiPropertyOptional({ example: 'Football' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  public sportName?: string;
}
