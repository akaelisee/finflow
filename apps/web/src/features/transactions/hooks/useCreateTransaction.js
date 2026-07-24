import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactionsApi';
export function useCreateTransaction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => transactionsApi.create(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
    });
}
