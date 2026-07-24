import type { User } from '@/shared/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
