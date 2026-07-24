import { apiClient } from '@/shared/lib/apiClient';
import type { Account, AccountType } from '@/shared/types';

export interface CreateAccountPayload {
  name: string;
  bank: string;
  type: AccountType;
  initialBalance: number;
  currency?: string;
  color?: string;
}

export type UpdateAccountPayload = Partial<CreateAccountPayload>;

export const accountsApi = {
  list: () => apiClient.get<Account[]>('/api/accounts'),
  create: (payload: CreateAccountPayload) => apiClient.post<Account>('/api/accounts', payload),
  update: (id: string, payload: UpdateAccountPayload) => apiClient.patch<Account>(`/api/accounts/${id}`, payload),
  remove: (id: string) => apiClient.delete<void>(`/api/accounts/${id}`),
};
