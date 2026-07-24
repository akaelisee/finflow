import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactionsApi';
export function useTransactions(query) {
    return useQuery({
        queryKey: ['transactions', query],
        queryFn: () => transactionsApi.list(query),
    });
}
