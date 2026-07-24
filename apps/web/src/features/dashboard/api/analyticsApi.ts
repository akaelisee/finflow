import { apiClient } from '@/shared/lib/apiClient';

export interface Kpis {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
}

export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  color: string;
  total: number;
}

export interface MonthlyPoint {
  month: string;
  income: number;
  expenses: number;
}

export const analyticsApi = {
  kpis: (month: string) => apiClient.get<Kpis>(`/api/analytics/kpis?month=${month}`),
  byCategory: (month: string) => apiClient.get<CategoryBreakdown[]>(`/api/analytics/by-category?month=${month}`),
  monthly: (months = 6) => apiClient.get<MonthlyPoint[]>(`/api/analytics/monthly?months=${months}`),
};
