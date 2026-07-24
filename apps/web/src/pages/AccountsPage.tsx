import { useState } from 'react';
import { useAccounts, AccountsList, AddAccountModal } from '@/features/accounts';
import { Button } from '@/shared/ui';

export function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Comptes</h1>
        <Button onClick={() => setIsModalOpen(true)}>Ajouter un compte</Button>
      </div>
      <AccountsList accounts={accounts ?? []} isLoading={isLoading} />
      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
