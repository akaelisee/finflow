import { apiClient } from '@/shared/lib/apiClient';
function buildQueryString(query) {
    const params = new URLSearchParams();
    if (query.accountId)
        params.set('accountId', query.accountId);
    if (query.categoryId)
        params.set('categoryId', query.categoryId);
    if (query.from)
        params.set('from', query.from);
    if (query.to)
        params.set('to', query.to);
    if (query.search)
        params.set('q', query.search);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
}
export const transactionsApi = {
    list: (query = {}) => apiClient.get(`/api/transactions${buildQueryString(query)}`),
    create: (payload) => apiClient.post('/api/transactions', payload),
    remove: (id) => apiClient.delete(`/api/transactions/${id}`),
};
