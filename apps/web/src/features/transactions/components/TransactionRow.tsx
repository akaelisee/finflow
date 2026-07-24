import type { Transaction } from '@/shared/types';
import { formatMoney } from '@/shared/lib/formatMoney';
import { formatDate } from '@/shared/lib/formatDate';
import { cn } from '@/shared/lib/cn';

interface TransactionRowProps {
  transaction: Transaction;
  onDelete?: (() => void) | undefined;
}

export function TransactionRow({ transaction, onDelete }: TransactionRowProps) {
  const isExpense = transaction.amount < 0;

  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 pr-4 text-sm text-gray-500">{formatDate(transaction.transactionDate)}</td>
      <td className="py-2 pr-4 text-sm text-gray-900">{transaction.label}</td>
      <td className={cn('py-2 pr-4 text-right text-sm font-medium', isExpense ? 'text-red-600' : 'text-green-600')}>
        {formatMoney(transaction.amount)}
      </td>
      <td className="py-2 text-right">
        {onDelete ? (
          <button type="button" onClick={onDelete} className="text-sm text-gray-400 hover:text-red-600">
            Supprimer
          </button>
        ) : null}
      </td>
    </tr>
  );
}
