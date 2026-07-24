import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Account } from '@/shared/types';
import { accountsApi } from '../api/accountsApi';
import type { CreateAccountPayload } from '../api/accountsApi';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, CreateAccountPayload>({
    mutationFn: (payload) => accountsApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
}
