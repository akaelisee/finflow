import type { Account } from '@/shared/types';
import { EmptyState, Skeleton } from '@/shared/ui';
import { AccountCard } from './AccountCard';

interface AccountsListProps {
  accounts: Account[];
  isLoading: boolean;
  onSelect?: (account: Account) => void;
}

export function AccountsList({ accounts, isLoading, onSelect }: AccountsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32" />
        ))}
      </div>
    );
  }

  if (accounts.length === 0) {
    return <EmptyState title="Aucun compte" description="Ajoutez votre premier compte bancaire pour commencer." />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} onClick={() => onSelect?.(account)} />
      ))}
    </div>
  );
}
