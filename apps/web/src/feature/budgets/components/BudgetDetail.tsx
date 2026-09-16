import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconAlertTriangle,
  IconMovie,
} from '@tabler/icons-react';
import { Budgets, UpdateBudgetsInput } from '../types/budget.types';
import { AlertDrop } from '@/shared/ui/AlertDrop';
import { useState } from 'react';
import { BudgetsForm } from './BudgetsForm';

type Props = {
    budget: Budgets,
    onDelete: (id: string) => void,
    onUpdate: (id: string, payload: UpdateBudgetsInput) => void
}


export const BudgetDetail = ({ budget, onDelete, onUpdate }: Props) => {
    const { id, amount, month } = budget;
    const { category } = budget as Budgets & {
        category: {
        color: string;
        icon: string;
        name: string;
        };
    };
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [budgetToEdit, setBudgetToEdit] = useState<Budgets | null>(null);

    const rMonth = new Date(`${month}-1`).toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
    });

    function back() {
        history.back()
    }

    const handleConfirmDelete = () => {
        if (budget) {
            onDelete(id)
        }
        setConfirmOpen(false)
        history.back()
    }

    const openEditForm = (budget: Budgets) => {
        setBudgetToEdit(budget)
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
        setBudgetToEdit(null)
    }

    return (
         <main className="min-w-0 px-6 py-5">
      {/* Barre d'actions */}
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          className="flex h-8 items-center gap-1.5 rounded-md border border-[#DFDDD4] bg-white px-2.5 text-[13px]"
        >
          <IconArrowLeft size={15} stroke={2} />
          Retour
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => openEditForm(budget)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#DFDDD4] bg-white px-3 text-[13px]"
          >
            <IconEdit size={14} stroke={2} />
            Modifier
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#E5B4B4] bg-white px-3 text-[13px] text-[#A32D2D]"
          >
            <IconTrash size={14} stroke={2} />
            Supprimer
          </button>
        </div>
      </div>

      <AlertDrop 
        open={confirmOpen}
        onOpen={setConfirmOpen}
        onConfirm={handleConfirmDelete}
      />

      <BudgetsForm 
        open={isFormOpen}
        onClose={closeForm}
        onUpdate={onUpdate}
        budgetToEdit={budgetToEdit}
      />

      {/* Identité du budget */}
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FAEEDA] text-[#633806]">
          <IconMovie size={28} stroke={1.75} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2.5">
            <p className="text-xl font-medium">Budget {category.name}</p>
            <span className="rounded-[10px] bg-[#FBE9E9] px-2 py-0.5 text-[11px] text-[#A32D2D]">
              Dépassé
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#79776F]">{rMonth} · Limite mensuelle {amount} €</p>
        </div>
      </div>

      {/* Bloc principal */}
      <div className="mb-5 rounded-lg bg-[#F9F8F4] p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-[32px] font-medium tabular-nums text-[#A32D2D]">225 €</p>
          <p className="text-sm tabular-nums text-[#79776F]">sur {amount} €</p>
        </div>

        <div className="mb-2 h-2.5 overflow-hidden rounded-md bg-white">
          <div className="h-full w-full bg-[#E24B4A]" />
        </div>

        <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#A32D2D]">
          <IconAlertTriangle size={14} stroke={2} />
          Dépassement de 25 € (112 % du budget)
        </p>
      </div>

      {/* Statistiques */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Transactions</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums">4</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Moyenne</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums">56,25 €</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Jours restants</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums">23</p>
        </div>
      </div>

      {/* Transactions liées */}
      <p className="mb-2.5 text-xs uppercase tracking-[0.05em] text-[#B4B1A6]">
        Transactions liées
      </p>

      <div className="divide-y divide-[#E8E6DE] overflow-hidden rounded-lg border border-[#E8E6DE] bg-white">
        <div className="flex items-center justify-between px-3.5 py-3 text-[13px]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-[#FAEEDA] text-[#633806]">
              <IconMovie size={13} stroke={1.75} />
            </div>
            <div>
              <p className="font-medium">Netflix</p>
              <p className="text-[11px] text-[#B4B1A6]">02 mai</p>
            </div>
          </div>
          <span className="font-medium tabular-nums text-[#A32D2D]">-15,99 €</span>
        </div>
      </div>
    </main>
    )
}