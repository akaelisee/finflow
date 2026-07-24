import type { Budget, Transaction } from '@/shared/types';
import { useCategories } from '@/features/categories';
import { EmptyState, Skeleton } from '@/shared/ui';
import { formatMoney } from '@/shared/lib/formatMoney';
import { useBudgetStatus } from '../hooks/useBudgetStatus';
import { BudgetProgressBar } from './BudgetProgressBar';

interface BudgetsListProps {
  budgets: Budget[];
  transactions: Transaction[];
  isLoading: boolean;
}

export function BudgetsList({ budgets, transactions, isLoading }: BudgetsListProps) {
  const { data: categories } = useCategories();
  const statuses = useBudgetStatus(budgets, transactions);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16" />
        ))}
      </div>
    );
  }

  if (budgets.length === 0) {
    return <EmptyState title="Aucun budget" description="Définissez un budget mensuel par catégorie." />;
  }

  return (
    <div className="flex flex-col gap-4">
      {statuses.map(({ budget, spent, percentUsed }) => {
        const category = categories?.find((item) => item.id === budget.categoryId);
        return (
          <div key={budget.id} className="rounded-lg border border-gray-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-gray-900">{category?.name ?? 'Catégorie'}</span>
              <span className="text-sm text-gray-500">
                {formatMoney(spent)} / {formatMoney(budget.amount)}
              </span>
            </div>
            <BudgetProgressBar percentUsed={percentUsed} />
          </div>
        );
      })}
    </div>
  );
}
