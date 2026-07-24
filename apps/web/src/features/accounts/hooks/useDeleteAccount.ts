import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountsApi } from '../api/accountsApi';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => accountsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['accounts'] }),
  });
}
