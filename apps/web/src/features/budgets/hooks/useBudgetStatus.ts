import { useMemo } from 'react';
import type { Budget, Transaction } from '@/shared/types';

export interface BudgetStatus {
  budget: Budget;
  spent: number;
  remaining: number;
  percentUsed: number;
}

export function useBudgetStatus(budgets: Budget[], transactions: Transaction[]): BudgetStatus[] {
  return useMemo(
    () =>
      budgets.map((budget) => {
        const spent = transactions
          .filter((transaction) => transaction.categoryId === budget.categoryId && transaction.amount < 0)
          .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
        const remaining = budget.amount - spent;
        const percentUsed = budget.amount > 0 ? Math.min(100, Math.round((spent / budget.amount) * 100)) : 0;
        return { budget, spent, remaining, percentUsed };
      }),
    [budgets, transactions],
  );
}
