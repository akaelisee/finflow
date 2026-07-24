import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
import type { AuthResponse, LoginPayload } from '../types/auth.types';

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload) => authApi.login(payload),
    onSuccess: (data) => setSession(data.user, data.accessToken),
  });
}
