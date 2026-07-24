import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Transaction } from '@/shared/types';
import { transactionsApi } from '../api/transactionsApi';
import type { CreateTransactionPayload } from '../api/transactionsApi';

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, CreateTransactionPayload>({
    mutationFn: (payload) => transactionsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
  });
}
