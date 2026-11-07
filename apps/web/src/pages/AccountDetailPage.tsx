
import { useParams } from 'react-router-dom';
import { useAccount } from '@/feature/accounts';
import { useUpdateAccount, useAccounts, useDeleteAccount } from '@/feature/accounts/index';
import { AccountDetail } from '@/feature/accounts/index';
import { Loading } from '@/shared/ui/Loading';

export function AccountDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { account, setAccount, isLoading, error } = useAccount(id!);
  const {accounts, setAccounts } = useAccounts();

  const { update } = useUpdateAccount({
    onSucces: (updated) => {
      setAccount(updated);
      setAccounts(accounts.map((c) => (c.id === updated.id ? updated : c)));
    }
  });

   const { remove } = useDeleteAccount ({
      onSuccess: (deletedId) => {
        setAccounts(accounts?.filter((c) => c.id !== deletedId));
      }
    })

  if (isLoading) return <Loading />;
  if (error) return <p>Erreur : {error.message}</p>;

  return (

    <div className="flex flex-col gap-4">
      {account && (
        <AccountDetail 
          account={account} 
          onUpdate={update}
          onDelete={remove}
        />
      )}
    </div>
  );
}