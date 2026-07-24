import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';
export function useCurrentUser() {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: authApi.me,
        enabled: accessToken !== null,
    });
}
