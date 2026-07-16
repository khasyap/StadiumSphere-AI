Object.assign(process.env, {
  API_PREFIX: 'api/v1',
  CORS_ORIGIN: 'http://localhost:5173',
  LOG_LEVEL: 'error',
  MONGODB_URL: 'mongodb://localhost:27017/stadiumsphere',
  NODE_ENV: 'test',
  PORT: '3000',
  RATE_LIMIT_MAX: '100',
  RATE_LIMIT_TTL_MS: '60000',
  REDIS_URL: 'redis://localhost:6379/0',
  SWAGGER_ENABLED: 'false',
});
