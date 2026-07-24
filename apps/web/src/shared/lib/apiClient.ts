export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export const API_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3000';

let tokenGetter: () => string | null = () => null;

/** Branché par le authStore au démarrage de l'app pour que apiClient puisse lire le token courant. */
export function setAuthTokenGetter(fn: () => string | null): void {
  tokenGetter = fn;
}

/** Utilisé pour les requêtes hors apiClient (ex: upload multipart) qui ont besoin du token courant. */
export function getAuthToken(): string | null {
  return tokenGetter();
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = tokenGetter();
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const { body, ...rest } = options;

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers,
    credentials: 'include',
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const details: unknown = await response.json().catch(() => undefined);
    const message =
      details && typeof details === 'object' && 'message' in details && typeof details.message === 'string'
        ? details.message
        : response.statusText;
    throw new ApiError(response.status, message, details);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string): Promise<T> => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown): Promise<T> => request<T>(path, { method: 'POST', body }),
  patch: <T>(path: string, body?: unknown): Promise<T> => request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string): Promise<T> => request<T>(path, { method: 'DELETE' }),
};
