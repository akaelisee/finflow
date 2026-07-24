import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountsApi } from '../api/accountsApi';
export function useUpdateAccount() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }) => accountsApi.update(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
    });
}
