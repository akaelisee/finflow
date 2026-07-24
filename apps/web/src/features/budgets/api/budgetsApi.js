import { apiClient } from '@/shared/lib/apiClient';
export const budgetsApi = {
    list: (month) => apiClient.get(`/api/budgets?month=${month}`),
    create: (payload) => apiClient.post('/api/budgets', payload),
};
