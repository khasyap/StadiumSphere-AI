import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'fan@example.com' })
  @IsEmail()
  public email!: string;

  @ApiProperty({ example: 'a-strong-password' })
  @IsString()
  @MinLength(12)
  @MaxLength(128)
  public password!: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  @IsNotEmpty()
  public refreshToken!: string;
}

export class LogoutDto extends RefreshTokenDto {}

export class AuthenticationTokensResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', type: String })
  public accessToken!: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', type: String })
  public refreshToken!: string;
}
