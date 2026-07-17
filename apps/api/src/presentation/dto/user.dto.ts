import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'fan@example.com' })
  @IsEmail()
  public email!: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'fan@example.com' })
  @IsEmail()
  @IsOptional()
  public email?: string;
}
