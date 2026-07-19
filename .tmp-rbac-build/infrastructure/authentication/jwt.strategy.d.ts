import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import type { AuthenticationTokenPayload } from '../../application/interfaces/authentication.interface';
import type { ApiEnvironment } from '../../config/environment.validation';
declare const JwtStrategy_base: new (options: import("passport-jwt").StrategyOptions) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configuration: ConfigService<ApiEnvironment, true>);
    validate(payload: AuthenticationTokenPayload): Omit<AuthenticationTokenPayload, 'tokenType'>;
}
export {};
