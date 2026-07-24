import { apiClient } from '@/shared/lib/apiClient';
export const authApi = {
    login: (payload) => apiClient.post('/api/auth/login', payload),
    register: (payload) => apiClient.post('/api/auth/register', payload),
    refresh: () => apiClient.post('/api/auth/refresh'),
    me: () => apiClient.get('/api/auth/me'),
};
