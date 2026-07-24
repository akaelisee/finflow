import { useState } from 'react';
import { currentMonth } from '@/shared/lib/formatDate';
import { useBudgets, BudgetsList, AddBudgetModal } from '@/features/budgets';
import { useTransactions } from '@/features/transactions';
import { Button } from '@/shared/ui';

export function BudgetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const month = currentMonth();
  const { data: budgets, isLoading: isLoadingBudgets } = useBudgets(month);
  const { data: transactions, isLoading: isLoadingTransactions } = useTransactions({ from: `${month}-01` });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Budgets</h1>
        <Button onClick={() => setIsModalOpen(true)}>Ajouter un budget</Button>
      </div>
      <BudgetsList
        budgets={budgets ?? []}
        transactions={transactions ?? []}
        isLoading={isLoadingBudgets || isLoadingTransactions}
      />
      <AddBudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
