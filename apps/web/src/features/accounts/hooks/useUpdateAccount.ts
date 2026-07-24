import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Account } from '@/shared/types';
import { accountsApi } from '../api/accountsApi';
import type { UpdateAccountPayload } from '../api/accountsApi';

interface UpdateAccountVariables {
  id: string;
  payload: UpdateAccountPayload;
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, UpdateAccountVariables>({
    mutationFn: ({ id, payload }) => accountsApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
}
