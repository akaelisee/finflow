import { apiClient } from '@/shared/lib/apiClient';
export const accountsApi = {
    list: () => apiClient.get('/api/accounts'),
    create: (payload) => apiClient.post('/api/accounts', payload),
    update: (id, payload) => apiClient.patch(`/api/accounts/${id}`, payload),
    remove: (id) => apiClient.delete(`/api/accounts/${id}`),
};
