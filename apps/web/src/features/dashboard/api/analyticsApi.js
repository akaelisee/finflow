import { apiClient } from '@/shared/lib/apiClient';
export const analyticsApi = {
    kpis: (month) => apiClient.get(`/api/analytics/kpis?month=${month}`),
    byCategory: (month) => apiClient.get(`/api/analytics/by-category?month=${month}`),
    monthly: (months = 6) => apiClient.get(`/api/analytics/monthly?months=${months}`),
};
