import { SummaryBudget } from '@/feature/budgets/components/SummaryBudget';
import { BudgetsForm } from '@/feature/budgets/components/BudgetsForm';
import { BudgetsList } from '@/feature/budgets/components/BudgetsList';
import { Button } from '@/shared/ui/Button';
import {
  IconPlus,
  IconAlertTriangle,
  IconBrandPlanetscale 
} from '@tabler/icons-react';
import { useBudgets, useCreateBudget } from '@/feature/budgets';
import { useState } from 'react';
import { useCategories } from '@/feature/categories';
import { AlertDrop } from '@/shared/ui/AlertDrop';
import { BudgetEmptyState } from '@/feature/budgets/components/BudgetEmptyState';
import { Loading } from '@/shared/ui/Loading';


export function BudgetsPage() {
  const { budgets, setBudgets, isLoading, error } = useBudgets();
  const { categories, setCategories } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false)

  const { create } = useCreateBudget({
    onSuccess: (created) => {
      setBudgets([...budgets, created])
      setIsFormOpen(false)
    }
  });

  const openCreateForm = () => {
    setIsFormOpen(true)
  }
  const closeForm = () => {
    setIsFormOpen(false)
  }

  if (isLoading) return <Loading />
  if (error) return <p>Erreur : {error.message}</p>;


  return (
    <main className="min-w-0 px-6 py-0">
      {/* En-tête */}
      <div className="flex justify-between relative z-0 mb-10">
        <div>
          <p className="text-2xl font-semibold">Buldgets</p>
          <span>Organisez vos dépenses avec des catégories personnalisées</span>
        </div>

        {
          budgets?.length ? (
          <Button 
            variant="danger" 
            icon={<IconPlus size={16} />}
            onClick={openCreateForm}
            className="flex flex-row gap-1 bg-blue-500 items-center cursor-pointer text-white rounded-md p-2"
            >
            Nouvelle Budgets
          </Button>
          ) : 
          (" ")
        }
      </div>

      {
        budgets?.length ? (
          <div className="">
            {/* Résumé */}
            <SummaryBudget />

            {/* Alerte */}
            <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-[#E8D9B0] bg-[#FDF6E3] px-3.5 py-3 text-[13px] text-[#7A5A12]">
              <IconAlertTriangle size={18} />
              <span>
                Alerte : la catégorie <strong className="font-medium">Loisirs</strong> a dépassé son
                budget de 25 €.
              </span>
            </div>

            <BudgetsList 
              budgets={budgets}
            />
          </div>
        ) : 
        (
          <BudgetEmptyState 
            openForm={openCreateForm}
          />
        )
      }

      <BudgetsForm 
        open={isFormOpen}
        onCreate={create}
        onClose={closeForm}
      />
    </main>
  );
}