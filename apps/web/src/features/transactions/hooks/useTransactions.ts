import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactionsApi';
import type { TransactionsQuery } from '../api/transactionsApi';

export function useTransactions(query: TransactionsQuery) {
  return useQuery({
    queryKey: ['transactions', query],
    queryFn: () => transactionsApi.list(query),
  });
}
