import { apiClient } from '@/shared/lib/apiClient';
import type { User } from '@/shared/types';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth.types';

export const authApi = {
  login: (payload: LoginPayload) => apiClient.post<AuthResponse>('/api/auth/login', payload),
  register: (payload: RegisterPayload) => apiClient.post<AuthResponse>('/api/auth/register', payload),
  refresh: () => apiClient.post<AuthResponse>('/api/auth/refresh'),
  me: () => apiClient.get<User>('/api/auth/me'),
};
