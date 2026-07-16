import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'qa', 'staging', 'production', 'test']),
  PORT: z.coerce.number().int().min(1).max(65_535),
  API_PREFIX: z.string().min(1),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
  CORS_ORIGIN: z.string().url(),
  MONGODB_URI: z.string().url(),
  MONGODB_DATABASE: z.string().min(1),
  MONGODB_SERVER_SELECTION_TIMEOUT_MS: z.coerce.number().int().positive(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().int().min(1).max(65_535),
  REDIS_PASSWORD: z.string().min(1).optional(),
  RATE_LIMIT_TTL_MS: z.coerce.number().int().positive(),
  RATE_LIMIT_MAX: z.coerce.number().int().positive(),
  SWAGGER_ENABLED: z.enum(['true', 'false']).transform((value) => value === 'true'),
});

export type ApiEnvironment = z.infer<typeof environmentSchema>;

export function validateEnvironment(environment: Record<string, unknown>): ApiEnvironment {
  return environmentSchema.parse(environment);
}
