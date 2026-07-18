import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import {
  AUTHENTICATION_APPLICATION_SERVICE,
  AuthenticationApplicationService,
} from '../../application';
import {
  AuthenticationTokensResponseDto,
  LoginDto,
  LogoutDto,
  RefreshTokenDto,
} from '../dto/authentication.dto';
import { SuccessResponse } from '../responses/success.response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  public constructor(
    @Inject(AUTHENTICATION_APPLICATION_SERVICE)
    private readonly authenticationService: AuthenticationApplicationService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate with email and password' })
  @ApiOkResponse({ description: 'Authentication successful.', type: AuthenticationTokensResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
  public async login(@Body() dto: LoginDto): Promise<SuccessResponse<AuthenticationTokensResponseDto>> {
    return new SuccessResponse('Authentication successful.', await this.authenticationService.login(dto));
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate a refresh token' })
  @ApiOkResponse({ description: 'Token refresh successful.', type: AuthenticationTokensResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token.' })
  public async refresh(
    @Body() dto: RefreshTokenDto,
  ): Promise<SuccessResponse<AuthenticationTokensResponseDto>> {
    return new SuccessResponse('Token refresh successful.', await this.authenticationService.refresh(dto.refreshToken));
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidate the active refresh token' })
  @ApiOkResponse({ description: 'Logout successful.' })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token.' })
  public async logout(@Body() dto: LogoutDto): Promise<SuccessResponse<undefined>> {
    await this.authenticationService.logout(dto.refreshToken);
    return new SuccessResponse('Logout successful.', undefined);
  }
}
