import { z } from 'zod';

const environmentSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

export const environment = environmentSchema.parse(import.meta.env);
