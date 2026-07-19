"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_validation_1 = require("./environment.validation");
const validEnvironment = {
    API_PREFIX: 'api/v1',
    CORS_ORIGIN: 'http://localhost:5173',
    BCRYPT_SALT_ROUNDS: '12',
    JWT_ACCESS_EXPIRES_IN: '900',
    JWT_ACCESS_SECRET: 'a-very-long-local-access-secret-that-is-at-least-32-characters',
    JWT_REFRESH_EXPIRES_IN: '604800',
    JWT_REFRESH_SECRET: 'a-very-long-local-refresh-secret-that-is-at-least-32-characters',
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
        expect((0, environment_validation_1.validateEnvironment)(validEnvironment)).toMatchObject({
            MONGODB_DATABASE: 'stadiumsphere',
            MONGODB_URI: 'mongodb://localhost:27017',
            REDIS_HOST: 'localhost',
            REDIS_PORT: 6379,
        });
    });
    it('rejects missing MongoDB and Redis configuration', () => {
        const invalidEnvironment = { ...validEnvironment };
        delete invalidEnvironment.MONGODB_URI;
        delete invalidEnvironment.REDIS_HOST;
        expect(() => (0, environment_validation_1.validateEnvironment)(invalidEnvironment)).toThrow();
    });
});
//# sourceMappingURL=environment.validation.spec.js.map