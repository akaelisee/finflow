import { useState } from 'react';
import type { FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Button, Input, toast } from '@/shared/ui';
import { CategoryPicker } from '@/features/categories';
import { currentMonth } from '@/shared/lib/formatDate';
import { budgetsApi } from '../api/budgetsApi';

interface AddBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddBudgetModal({ isOpen, onClose }: AddBudgetModalProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [amount, setAmount] = useState('0');
  const queryClient = useQueryClient();
  const month = currentMonth();

  const createBudget = useMutation({
    mutationFn: budgetsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast('Budget créé', 'success');
      onClose();
    },
    onError: () => toast('Impossible de créer le budget', 'error'),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!categoryId) return;
    createBudget.mutate({ categoryId, month, amount: Math.round(Number(amount) * 100) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un budget">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <CategoryPicker value={categoryId} onChange={setCategoryId} />
        <Input
          label="Montant mensuel (€)"
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
        <Button type="submit" isLoading={createBudget.isPending}>
          Ajouter
        </Button>
      </form>
    </Modal>
  );
}
