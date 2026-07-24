import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal, Button, Input, Select, toast } from '@/shared/ui';
import { useAccounts } from '@/features/accounts';
import { CategoryPicker } from '@/features/categories';
import { useCreateTransaction } from '../hooks/useCreateTransaction';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const { data: accounts } = useAccounts();
  const [accountId, setAccountId] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState(() => new Date().toISOString().slice(0, 10));
  const createTransaction = useCreateTransaction();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTransaction.mutate(
      {
        accountId,
        categoryId,
        label,
        amount: Math.round(Number(amount) * 100),
        transactionDate,
      },
      {
        onSuccess: () => {
          toast('Transaction ajoutée', 'success');
          onClose();
        },
        onError: () => toast("Impossible d'ajouter la transaction", 'error'),
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter une transaction">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          label="Compte"
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          placeholder="Sélectionner un compte"
          options={(accounts ?? []).map((account) => ({ value: account.id, label: account.name }))}
          required
        />
        <CategoryPicker value={categoryId} onChange={setCategoryId} />
        <Input label="Libellé" value={label} onChange={(event) => setLabel(event.target.value)} required />
        <Input
          label="Montant (€, négatif pour une dépense)"
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
        <Input
          label="Date"
          type="date"
          value={transactionDate}
          onChange={(event) => setTransactionDate(event.target.value)}
          required
        />
        <Button type="submit" isLoading={createTransaction.isPending}>
          Ajouter
        </Button>
      </form>
    </Modal>
  );
}
