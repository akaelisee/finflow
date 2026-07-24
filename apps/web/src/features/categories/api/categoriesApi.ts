import { apiClient } from '@/shared/lib/apiClient';
import type { Category } from '@/shared/types';

export interface CreateCategoryPayload {
  name: string;
  color: string;
  icon: string;
}

export const categoriesApi = {
  list: () => apiClient.get<Category[]>('/api/categories'),
  create: (payload: CreateCategoryPayload) => apiClient.post<Category>('/api/categories', payload),
};
