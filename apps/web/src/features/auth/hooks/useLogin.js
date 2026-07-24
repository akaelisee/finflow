import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
export function useLogin() {
    const setSession = useAuthStore((state) => state.setSession);
    return useMutation({
        mutationFn: (payload) => authApi.login(payload),
        onSuccess: (data) => setSession(data.user, data.accessToken),
    });
}
