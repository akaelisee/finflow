import { apiClient } from '@/shared/lib/apiClient';
export const categoriesApi = {
    list: () => apiClient.get('/api/categories'),
    create: (payload) => apiClient.post('/api/categories', payload),
};
