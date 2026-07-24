import { apiClient } from '@/shared/lib/apiClient';
import type { Budget } from '@/shared/types';

export interface CreateBudgetPayload {
  categoryId: string;
  month: string;
  amount: number;
}

export const budgetsApi = {
  list: (month: string) => apiClient.get<Budget[]>(`/api/budgets?month=${month}`),
  create: (payload: CreateBudgetPayload) => apiClient.post<Budget>('/api/budgets', payload),
};
