import { validateEnvironment } from './environment.validation';

const validEnvironment = {
  API_PREFIX: 'api/v1',
  CORS_ORIGIN: 'http://localhost:5173',
  LOG_LEVEL: 'info',
  MONGODB_DATABASE: 'stadiumsphere',
  MONGODB_URI: 'mongodb://localhost:27017',
  MONGODB_SERVER_SELECTION_TIMEOUT_MS: '5000',
  NODE_ENV: 'test',
  PORT: '3000',
  RATE_LIMIT_MAX: '100',
  RATE_LIMIT_TTL_MS: '60000',
  REDIS_HOST: 'localhost',
  REDIS_PORT: '6379',
  SWAGGER_ENABLED: 'false',
};

describe('validateEnvironment', () => {
  it('parses the required persistence environment variables', () => {
    expect(validateEnvironment(validEnvironment)).toMatchObject({
      MONGODB_DATABASE: 'stadiumsphere',
      MONGODB_URI: 'mongodb://localhost:27017',
      REDIS_HOST: 'localhost',
      REDIS_PORT: 6379,
    });
  });

  it('rejects missing MongoDB and Redis configuration', () => {
    const invalidEnvironment: Record<string, string> = { ...validEnvironment };
    delete invalidEnvironment.MONGODB_URI;
    delete invalidEnvironment.REDIS_HOST;

    expect(() => validateEnvironment(invalidEnvironment)).toThrow();
  });
});
