declare module 'passport-jwt' {
  import type { Strategy as PassportStrategy } from 'passport';

  interface StrategyOptions {
    jwtFromRequest(request: unknown): string | null;
    secretOrKey: string;
  }

  export class Strategy extends PassportStrategy {
    public constructor(options: StrategyOptions);
  }

  export const ExtractJwt: {
    fromAuthHeaderAsBearerToken(): (request: unknown) => string | null;
  };
}
