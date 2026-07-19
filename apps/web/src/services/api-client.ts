import { environment } from '@/config/environment';
import type { ApiSuccess } from '@/types/api';

export class ApiRequestError extends Error {
  public constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

function getAccessToken(): string | undefined {
  const token = window.localStorage.getItem('stadiumsphere-access-token');
  return token === null || token.length === 0 ? undefined : token;
}

async function readResponse<T>(response: Response): Promise<T> {
  const payload: unknown = await response.json().catch(() => undefined);

  if (!response.ok) {
    const message = typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
      ? payload.message
      : `The platform request failed with status ${response.status}.`;
    throw new ApiRequestError(response.status, message);
  }

  return payload as T;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  if (init.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }
  if (token !== undefined) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${environment.VITE_API_BASE_URL}${path}`, { ...init, headers });
  const payload = await readResponse<ApiSuccess<T>>(response);
  return payload.data;
}

export const resourceApi = {
  create<T, TInput>(path: string, input: TInput): Promise<T> {
    return apiRequest<T>(path, { body: JSON.stringify(input), method: 'POST' });
  },
  delete(path: string): Promise<void> {
    return apiRequest<void>(path, { method: 'DELETE' });
  },
  list<T>(path: string): Promise<readonly T[]> {
    return apiRequest<readonly T[]>(path);
  },
  update<T, TInput>(path: string, input: TInput): Promise<T> {
    return apiRequest<T>(path, { body: JSON.stringify(input), method: 'PUT' });
  },
  workflow<T>(path: string, input?: unknown): Promise<T> {
    return apiRequest<T>(path, input === undefined ? { method: 'POST' } : { body: JSON.stringify(input), method: 'POST' });
  },
};
