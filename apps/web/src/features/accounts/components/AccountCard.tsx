import type { Account } from '@/shared/types';
import { Badge } from '@/shared/ui';
import { formatMoney } from '@/shared/lib/formatMoney';

const typeLabels: Record<Account['type'], string> = {
  CHECKING: 'Compte courant',
  SAVINGS: 'Épargne',
  CREDIT: 'Crédit',
};

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

export function AccountCard({ account, onClick }: AccountCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 border-l-4 p-4 text-left transition-shadow hover:shadow-md"
      style={{ borderLeftColor: account.color }}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">{account.name}</span>
        <Badge variant="neutral">{typeLabels[account.type]}</Badge>
      </div>
      <span className="text-sm text-gray-500">{account.bank}</span>
      <span className="text-lg font-bold text-gray-900">
        {formatMoney(account.initialBalance, account.currency)}
      </span>
    </button>
  );
}
