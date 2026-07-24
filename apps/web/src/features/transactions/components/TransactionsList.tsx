import type { Transaction } from '@/shared/types';
import { EmptyState, Skeleton } from '@/shared/ui';
import { TransactionRow } from './TransactionRow';

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
}

export function TransactionsList({ transactions, isLoading, onDelete }: TransactionsListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return <EmptyState title="Aucune transaction" description="Ajoutez une transaction ou importez un fichier CSV." />;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-400">
          <th className="pb-2 pr-4 font-medium">Date</th>
          <th className="pb-2 pr-4 font-medium">Libellé</th>
          <th className="pb-2 pr-4 text-right font-medium">Montant</th>
          <th className="pb-2" />
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            {...(onDelete ? { onDelete: () => onDelete(transaction.id) } : {})}
          />
        ))}
      </tbody>
    </table>
  );
}
