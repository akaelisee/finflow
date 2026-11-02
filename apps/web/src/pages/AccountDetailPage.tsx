
import { useParams } from 'react-router-dom';
import { useAccount } from '@/feature/accounts';
import { Accounts } from '@/feature/accounts/types/accounts.types';
import { useState } from 'react';
import { AccountDetail } from '@/feature/accounts/components/AccountDetail';

export function AccountDetailPage() {
  const { id } = useParams<{ id: string }>();
  const  { account, isLoading, error } = useAccount(id!);
  const [accounts, setAccounts] = useState<Accounts[]>([]);

  return (

    <AccountDetail 
      account={account}
    />
  );
}