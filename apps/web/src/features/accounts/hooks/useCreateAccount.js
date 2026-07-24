import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountsApi } from '../api/accountsApi';
export function useCreateAccount() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => accountsApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
    });
}
