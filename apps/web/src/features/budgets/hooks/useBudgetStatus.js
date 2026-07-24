import { useMemo } from 'react';
export function useBudgetStatus(budgets, transactions) {
    return useMemo(() => budgets.map((budget) => {
        const spent = transactions
            .filter((transaction) => transaction.categoryId === budget.categoryId && transaction.amount < 0)
            .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
        const remaining = budget.amount - spent;
        const percentUsed = budget.amount > 0 ? Math.min(100, Math.round((spent / budget.amount) * 100)) : 0;
        return { budget, spent, remaining, percentUsed };
    }), [budgets, transactions]);
}
