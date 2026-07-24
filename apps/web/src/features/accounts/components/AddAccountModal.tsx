import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal, Button, Input, Select, toast } from '@/shared/ui';
import type { AccountType } from '@/shared/types';
import { useCreateAccount } from '../hooks/useCreateAccount';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeOptions: { value: AccountType; label: string }[] = [
  { value: 'CHECKING', label: 'Compte courant' },
  { value: 'SAVINGS', label: 'Épargne' },
  { value: 'CREDIT', label: 'Crédit' },
];

export function AddAccountModal({ isOpen, onClose }: AddAccountModalProps) {
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [type, setType] = useState<AccountType>('CHECKING');
  const [initialBalance, setInitialBalance] = useState('0');
  const createAccount = useCreateAccount();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAccount.mutate(
      { name, bank, type, initialBalance: Math.round(Number(initialBalance) * 100) },
      {
        onSuccess: () => {
          toast('Compte créé', 'success');
          onClose();
        },
        onError: () => toast('Impossible de créer le compte', 'error'),
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un compte">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Nom du compte" value={name} onChange={(event) => setName(event.target.value)} required />
        <Input label="Banque" value={bank} onChange={(event) => setBank(event.target.value)} required />
        <Select
          label="Type"
          options={typeOptions}
          value={type}
          onChange={(event) => setType(event.target.value as AccountType)}
        />
        <Input
          label="Solde initial (€)"
          type="number"
          step="0.01"
          value={initialBalance}
          onChange={(event) => setInitialBalance(event.target.value)}
        />
        <Button type="submit" isLoading={createAccount.isPending}>
          Ajouter
        </Button>
      </form>
    </Modal>
  );
}
