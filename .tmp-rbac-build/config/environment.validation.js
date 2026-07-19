"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironment = validateEnvironment;
const zod_1 = require("zod");
const environmentSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'qa', 'staging', 'production', 'test']),
    PORT: zod_1.z.coerce.number().int().min(1).max(65_535),
    API_PREFIX: zod_1.z.string().min(1),
    LOG_LEVEL: zod_1.z.enum(['debug', 'info', 'warn', 'error']),
    CORS_ORIGIN: zod_1.z.string().url(),
    MONGODB_URI: zod_1.z.string().url(),
    MONGODB_DATABASE: zod_1.z.string().min(1),
    MONGODB_SERVER_SELECTION_TIMEOUT_MS: zod_1.z.coerce.number().int().positive(),
    REDIS_HOST: zod_1.z.string().min(1),
    REDIS_PORT: zod_1.z.coerce.number().int().min(1).max(65_535),
    REDIS_PASSWORD: zod_1.z.string().min(1).optional(),
    RATE_LIMIT_TTL_MS: zod_1.z.coerce.number().int().positive(),
    RATE_LIMIT_MAX: zod_1.z.coerce.number().int().positive(),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.coerce.number().int().positive(),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.coerce.number().int().positive(),
    BCRYPT_SALT_ROUNDS: zod_1.z.coerce.number().int().min(10).max(14),
    SWAGGER_ENABLED: zod_1.z.enum(['true', 'false']).transform((value) => value === 'true'),
});
function validateEnvironment(environment) {
    return environmentSchema.parse(environment);
}
//# sourceMappingURL=environment.validation.js.map