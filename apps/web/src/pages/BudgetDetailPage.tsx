import { Budgets, useBudgets, useDeleteBudget, useUpdateBudget } from '@/feature/budgets';
import { BudgetDetail } from '@/feature/budgets/components/BudgetDetail';
import { useBudget } from '@/feature/budgets/hooks/useBudget';
import { Loading } from '@/shared/ui/Loading';
import { useParams } from 'react-router-dom';

export function BudgetDetailPage() {
  const { id } = useParams<{id: string}>();
  const { isLoading, budget, setBudget, error } = useBudget(id!);
  const { budgets, setBudgets } = useBudgets();

  const { update } = useUpdateBudget({
    onSuccess: (updated) => {
      setBudget(updated);
      setBudgets(budgets.map((c) => (c.id === updated.id ? updated : c)));
    }
  })

  const { remove } = useDeleteBudget ({
    onSuccess: (deletedId) => {
      setBudgets(budgets?.filter((c) => c.id !== deletedId));
    }
  })

  if (isLoading) return <Loading />
  if (error || !budget ) return <p>Catégorie introuvable</p>;

  return (
    <BudgetDetail 
     budget={budget}
     onDelete={remove}
     onUpdate={update}
    />
  );
}