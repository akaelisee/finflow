import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAuthTokenGetter } from '@/shared/lib/apiClient';
export const useAuthStore = create()(persist((set) => ({
    user: null,
    accessToken: null,
    setSession: (user, accessToken) => set({ user, accessToken }),
    clearSession: () => set({ user: null, accessToken: null }),
}), { name: 'finflow-auth' }));
setAuthTokenGetter(() => useAuthStore.getState().accessToken);
