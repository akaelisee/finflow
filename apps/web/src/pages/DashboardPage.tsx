import {
  IconSearch,
  IconPlus,
  IconWallet,
  IconShoppingCart,
  IconBuildingBank,
} from '@tabler/icons-react';

export function DashboardPage() {
  return (
    <main className="min-w-0 px-6 py-5">
      {/* En-tête */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl">Bonjour, Sarah</h2>
          <p className="mt-[3px] text-[13px] text-[#79776F]">Vue d'ensemble · Mai 2026</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <div className="relative">
            <IconSearch
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#B4B1A6]"
            />
            <input
              type="text"
              placeholder="Rechercher…"
              className="h-8 w-[180px] rounded-md border border-[#DFDDD4] pl-[30px] pr-2 text-[13px]"
            />
          </div>
          <select className="h-8 rounded-md border border-[#DFDDD4] px-2.5 text-[13px]">
            <option>Ce mois</option>
            <option>30 derniers jours</option>
          </select>
          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-md bg-[#378ADD] px-3 text-[13px] text-white"
          >
            <IconPlus size={14} stroke={2} />
            Nouveau
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="mb-[18px] grid grid-cols-4 gap-2.5">
        <div className="rounded-lg bg-[#F9F8F4] px-3.5 py-3">
          <p className="flex items-center gap-1.5 text-[11px] text-[#79776F]">
            <IconWallet size={12} />
            Solde total
          </p>
          <p className="mt-1 text-xl font-medium tabular-nums">4 285 €</p>
          <p className="mt-0.5 text-[11px] text-[#0F6E56]">↑ 2,3 %</p>
        </div>
      </div>

      {/* Deux colonnes */}
      <div className="mb-3.5 grid grid-cols-2 gap-3">
        {/* Donut */}
        <div className="rounded-lg border border-[#E8E6DE] bg-white p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm">Dépenses par catégorie</h3>
            <a className="cursor-pointer text-xs text-[#1C5E9E]">Voir tout</a>
          </div>
          <div className="flex items-center gap-3.5">
            <svg viewBox="0 0 100 100" className="h-[110px] w-[110px] shrink-0">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F9F8F4" strokeWidth="16" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#378ADD"
                strokeWidth="16"
                strokeDasharray="75 251"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#D85A30"
                strokeWidth="16"
                strokeDasharray="55 251"
                strokeDashoffset="-75"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="flex-1 text-xs">
              <div className="flex items-center gap-1.5 py-[3px]">
                <span className="h-2 w-2 rounded-sm bg-[#378ADD]" />
                <span className="flex-1">Logement</span>
                <span className="tabular-nums text-[#79776F]">550 €</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions récentes */}
        <div className="rounded-lg border border-[#E8E6DE] bg-white p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm">Transactions récentes</h3>
            <a className="cursor-pointer text-xs text-[#1C5E9E]">Voir tout</a>
          </div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-[#FAECE7] text-[#712B13]">
                  <IconShoppingCart size={13} stroke={1.75} />
                </div>
                <div>
                  <p className="font-medium">Carrefour City</p>
                  <p className="text-[10px] text-[#B4B1A6]">08 mai</p>
                </div>
              </div>
              <span className="font-medium tabular-nums text-[#A32D2D]">-42,80 €</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Budgets */}
        <div className="rounded-lg border border-[#E8E6DE] bg-white p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm">Budgets du mois</h3>
            <a className="cursor-pointer text-xs text-[#1C5E9E]">Gérer</a>
          </div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div>
              <div className="mb-1 flex justify-between">
                <span className="flex items-center gap-1.5">
                  <IconShoppingCart size={12} className="text-[#712B13]" />
                  Alimentation
                </span>
                <span className="tabular-nums text-[#79776F]">405 / 500 €</span>
              </div>
              <div className="h-[5px] overflow-hidden rounded-[3px] bg-[#F9F8F4]">
                <div className="h-full w-[81%] bg-[#D85A30]" />
              </div>
            </div>
          </div>
        </div>

        {/* Comptes */}
        <div className="rounded-lg border border-[#E8E6DE] bg-white p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm">Mes comptes</h3>
            <a className="cursor-pointer text-xs text-[#1C5E9E]">Voir tout</a>
          </div>
          <div className="flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#E6F1FB] text-[#0C447C]">
                  <IconBuildingBank size={14} stroke={1.75} />
                </div>
                <div>
                  <p className="font-medium">Compte courant</p>
                  <p className="text-[10px] text-[#B4B1A6]">BNP Paribas</p>
                </div>
              </div>
              <span className="font-medium tabular-nums">2 847 €</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}