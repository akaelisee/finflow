import {
  IconArrowLeft,
  IconEdit,
  IconDownload,
  IconTrash,
  IconBuildingBank,
  IconShoppingCart,
} from '@tabler/icons-react';
import { AccountForm, Accounts } from '@/feature/accounts/index';
import { BalanceChart, Statistics, UpdateAccountInput } from '@/feature/accounts/index';
import { formatEuros } from '@/shared/lib/format';
import { useState } from 'react';
import { AlertDrop } from '@/shared/ui/AlertDrop';

type Props = {
  account: Accounts;
  onUpdate: (id: string, payload: UpdateAccountInput) => void;
  onDelete: (id: string) => void;
};

export function AccountDetail({ account, onUpdate, onDelete }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Accounts | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openEditForm = (account: Accounts) => {
    setAccountToEdit(account);
    setIsFormOpen(true);
  }

  const handleConfirmDelete = () => {
    if (account) {
      onDelete(account.id);
    } 
    setConfirmOpen(false);
    window.history.back();
  }

  const closeForm = () => {
    setIsFormOpen(false);
  }

  return (
    <main className="min-w-0 px-6 py-5">
      {/* Actions */}
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex h-8 items-center gap-1.5 rounded-md border border-[#DFDDD4] bg-white px-2.5 text-[13px]"
        >
          <IconArrowLeft size={15} stroke={2} />
          Retour
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => openEditForm(account)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#DFDDD4] bg-white px-3 text-[13px]"
          >
            <IconEdit size={14} stroke={2} />
            Modifier
          </button>
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#DFDDD4] bg-white px-3 text-[13px]"
          >
            <IconDownload size={14} stroke={2} />
            Exporter
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="flex h-8 items-center justify-center rounded-md border border-[#E5B4B4] bg-white px-3 text-[#A32D2D]"
          >
            <IconTrash size={14} stroke={2} />
          </button>
        </div>
      </div>

      {/* Identité */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#E6F1FB] text-[#0C447C]">
          <IconBuildingBank size={28} stroke={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-medium">{account?.name}</p>
          <p className="mt-1 truncate text-[13px] text-[#79776F]">
            {account?.bank} · {account?.iban}
          </p>
        </div>
      </div>

      {/* Solde + graphique */}
      <BalanceChart account={account} />
    

      {/* Statistiques */}
      <Statistics account={account} />

      <AccountForm 
        open={isFormOpen}
        onClose={closeForm}
        onUpdate={onUpdate}
        accountToEdit={accountToEdit}
      />

      <AlertDrop 
        open={confirmOpen}
        onOpen={setConfirmOpen}
        onConfirm={handleConfirmDelete}
      />

      {/* Transactions */}
      {/* <LastTransactions /> */}
      {/* <div>
        <p className="mb-2.5 text-xs uppercase tracking-[0.05em] text-[#B4B1A6]">
            Dernières transactions
        </p>
        <div className="divide-y divide-[#E8E6DE] overflow-hidden rounded-lg border border-[#E8E6DE] bg-white">
            <div className="flex items-center justify-between px-3.5 py-3 text-[13px]">
            <div className="flex items-center gap-2.5">
                <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-[#FAECE7] text-[#712B13]">
                <IconShoppingCart size={13} stroke={1.75} />
                </div>
                <div>
                <p className="font-medium">Carrefour City</p>
                <p className="text-[11px] text-[#B4B1A6]">08 mai</p>
                </div>
            </div>
            <span className="font-medium tabular-nums text-[#A32D2D]">-42,80 €</span>
            </div>

            <div className="px-3.5 py-3 text-center">
            <a className="cursor-pointer text-xs text-[#1C5E9E]">
                Voir les 143 autres transactions →
            </a>
            </div>
        </div>

      </div> */}
    </main>
    )
}