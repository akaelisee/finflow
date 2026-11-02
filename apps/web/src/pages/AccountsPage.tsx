
import { AccountsRowsList, useAccounts } from '@/feature/accounts';
import { Button } from '@/shared/ui/Button';
import { IconPlus, IconDots, IconBuildingBank } from '@tabler/icons-react';
import { Loading } from '@/shared/ui/Loading';

export function AccountsPage() {
  const { accounts, setAccounts, isLoading, error } = useAccounts();

    if (isLoading) return <Loading />;
    if (error) return <p>Erreur : {error.message}</p>;

  return (
      <div className="min-w-0 px-6 py-5">
           {/* En-tête */}
        <div className="flex justify-between relative z-0 mb-10">
          <div>
            <p className="text-2xl font-semibold">Comptes</p>
            <span>Organisez vos dépenses avec des Comptes personnalisées</span>
          </div>
            <Button 
              variant="danger" 
              icon={<IconPlus size={16} />}
            //  onClick={openCreateForm}
              className="flex flex-row gap-1 bg-blue-500 items-center cursor-pointer text-white rounded-md p-2"
              >
              Nouvelle Comptes
            </Button>
        </div>

        <AccountsRowsList 
          accounts={accounts}
        />
    </div>
  );
}