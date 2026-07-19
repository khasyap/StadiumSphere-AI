import type { AuthenticationTokenPayload } from '../../application';
export type AuthenticatedUser = Omit<AuthenticationTokenPayload, 'tokenType'>;
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
