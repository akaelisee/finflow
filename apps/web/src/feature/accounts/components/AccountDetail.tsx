import {
  IconArrowLeft,
  IconEdit,
  IconDownload,
  IconTrash,
  IconBuildingBank,
  IconShoppingCart,
} from '@tabler/icons-react';
import { Accounts } from '@/feature/accounts/index';

type Props = {
  account: Accounts;
};

export function AccountDetail({ account }: Props) {

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
          <p className="text-xl font-medium">Compte courant</p>
          <p className="mt-1 truncate text-[13px] text-[#79776F]">
            BNP Paribas · IBAN FR76 3000 4000 0300 0000 0000 000
          </p>
        </div>
      </div>

      {/* Solde + graphique */}
      <div className="mb-5 rounded-lg bg-[#F9F8F4] p-5">
        <p className="text-xs text-[#79776F]">Solde actuel</p>
        <p className="mt-1.5 text-[32px] font-medium tabular-nums">2 847,20 €</p>
        <p className="mt-1 text-xs tabular-nums text-[#0F6E56]">+152 € ce mois-ci</p>

        <svg viewBox="0 0 400 80" className="mt-4 h-20 w-full" preserveAspectRatio="none">
          <polygon
            points="0,50 40,44 80,56 120,40 160,48 200,36 240,30 280,40 320,28 360,20 400,16 400,80 0,80"
            fill="#378ADD"
            fillOpacity="0.08"
          />
          <polyline
            points="0,50 40,44 80,56 120,40 160,48 200,36 240,30 280,40 320,28 360,20 400,16"
            fill="none"
            stroke="#378ADD"
            strokeWidth="1.5"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[11px] text-[#B4B1A6]">
          <span>Il y a 30 jours</span>
          <span>Aujourd'hui</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Revenus (mois)</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums text-[#0F6E56]">+3 200 €</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Dépenses (mois)</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums text-[#A32D2D]">-3 048 €</p>
        </div>
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="text-[11px] text-[#79776F]">Transactions</p>
          <p className="mt-1 text-[18px] font-medium tabular-nums">147</p>
        </div>
      </div>

      {/* Transactions */}
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
    </main>
    )
}