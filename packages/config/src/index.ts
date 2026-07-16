import type { z } from 'zod';

export type EnvironmentInput = Record<string, string | undefined>;

export function parseEnvironment<TSchema extends z.ZodType>(
  schema: TSchema,
  environment: EnvironmentInput,
): z.output<TSchema> {
  return schema.parse(environment);
}
