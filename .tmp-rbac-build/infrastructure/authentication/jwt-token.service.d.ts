import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { AuthenticationTokenPayload, AuthenticationTokenService } from '../../application/interfaces/authentication.interface';
import type { ApiEnvironment } from '../../config/environment.validation';
export declare class JwtTokenService implements AuthenticationTokenService {
    private readonly configuration;
    private readonly jwtService;
    constructor(configuration: ConfigService<ApiEnvironment, true>, jwtService: JwtService);
    createAccessToken(payload: Omit<AuthenticationTokenPayload, 'tokenType'>): Promise<string>;
    createRefreshToken(payload: Omit<AuthenticationTokenPayload, 'tokenType'>): Promise<string>;
    verifyRefreshToken(token: string): Promise<AuthenticationTokenPayload>;
}
