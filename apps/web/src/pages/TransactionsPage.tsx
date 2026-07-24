import { useState } from 'react';
import {
  useTransactions,
  useDeleteTransaction,
  useTransactionsFilterStore,
  TransactionsList,
  TransactionFilters,
  AddTransactionModal,
} from '@/features/transactions';
import { useDebounce } from '@/shared/hooks';
import { Button } from '@/shared/ui';

export function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accountId = useTransactionsFilterStore((state) => state.accountId);
  const categoryId = useTransactionsFilterStore((state) => state.categoryId);
  const search = useTransactionsFilterStore((state) => state.search);
  const debouncedSearch = useDebounce(search);

  const { data: transactions, isLoading } = useTransactions({ accountId, categoryId, search: debouncedSearch });
  const deleteTransaction = useDeleteTransaction();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <Button onClick={() => setIsModalOpen(true)}>Ajouter une transaction</Button>
      </div>
      <TransactionFilters />
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <TransactionsList
          transactions={transactions ?? []}
          isLoading={isLoading}
          onDelete={(id) => deleteTransaction.mutate(id)}
        />
      </div>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
