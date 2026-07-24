import { useQuery } from '@tanstack/react-query';
import { budgetsApi } from '../api/budgetsApi';
export function useBudgets(month) {
    return useQuery({
        queryKey: ['budgets', month],
        queryFn: () => budgetsApi.list(month),
    });
}
