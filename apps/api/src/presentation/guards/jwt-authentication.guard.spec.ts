import { JwtAuthenticationGuard } from './jwt-authentication.guard';

describe('JwtAuthenticationGuard', () => {
  it('is registered as the JWT Passport guard', () => {
    expect(JwtAuthenticationGuard).toBeDefined();
  });
});
