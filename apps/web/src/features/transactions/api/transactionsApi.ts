import { apiClient } from '@/shared/lib/apiClient';
import type { Transaction } from '@/shared/types';

export interface TransactionsQuery {
  accountId?: string | null;
  categoryId?: string | null;
  from?: string | null;
  to?: string | null;
  search?: string;
}

export interface CreateTransactionPayload {
  accountId: string;
  categoryId?: string | null;
  amount: number;
  label: string;
  transactionDate: string;
  notes?: string | null;
}

function buildQueryString(query: TransactionsQuery): string {
  const params = new URLSearchParams();
  if (query.accountId) params.set('accountId', query.accountId);
  if (query.categoryId) params.set('categoryId', query.categoryId);
  if (query.from) params.set('from', query.from);
  if (query.to) params.set('to', query.to);
  if (query.search) params.set('q', query.search);
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export const transactionsApi = {
  list: (query: TransactionsQuery = {}) =>
    apiClient.get<Transaction[]>(`/api/transactions${buildQueryString(query)}`),
  create: (payload: CreateTransactionPayload) => apiClient.post<Transaction>('/api/transactions', payload),
  remove: (id: string) => apiClient.delete<void>(`/api/transactions/${id}`),
};
