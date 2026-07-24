import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/shared/types';
import { setAuthTokenGetter } from '@/shared/lib/apiClient';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setSession: (user: User, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setSession: (user, accessToken) => set({ user, accessToken }),
      clearSession: () => set({ user: null, accessToken: null }),
    }),
    { name: 'finflow-auth' },
  ),
);

setAuthTokenGetter(() => useAuthStore.getState().accessToken);
