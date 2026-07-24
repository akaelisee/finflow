export class ApiError extends Error {
    status;
    details;
    constructor(status, message, details) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}
export const API_URL = import.meta.env['VITE_API_URL'] ?? 'http://localhost:3000';
let tokenGetter = () => null;
/** Branché par le authStore au démarrage de l'app pour que apiClient puisse lire le token courant. */
export function setAuthTokenGetter(fn) {
    tokenGetter = fn;
}
/** Utilisé pour les requêtes hors apiClient (ex: upload multipart) qui ont besoin du token courant. */
export function getAuthToken() {
    return tokenGetter();
}
async function request(path, options = {}) {
    const token = tokenGetter();
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    if (token)
        headers.set('Authorization', `Bearer ${token}`);
    const { body, ...rest } = options;
    const response = await fetch(`${API_URL}${path}`, {
        ...rest,
        headers,
        credentials: 'include',
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok) {
        const details = await response.json().catch(() => undefined);
        const message = details && typeof details === 'object' && 'message' in details && typeof details.message === 'string'
            ? details.message
            : response.statusText;
        throw new ApiError(response.status, message, details);
    }
    if (response.status === 204)
        return undefined;
    return (await response.json());
}
export const apiClient = {
    get: (path) => request(path, { method: 'GET' }),
    post: (path, body) => request(path, { method: 'POST', body }),
    patch: (path, body) => request(path, { method: 'PATCH', body }),
    delete: (path) => request(path, { method: 'DELETE' }),
};
