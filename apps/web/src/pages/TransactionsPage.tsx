import { Button } from '@/shared/ui/Button';
import { IconPlus, IconSearch, IconDots, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const COLS = 'grid grid-cols-[90px_1fr_140px_110px_110px_32px] gap-3 px-3.5';

export function TransactionsPage() {
  return (
    <div className="min-w-0 px-6 py-5">
      {/* En-tête */}
      <div className="flex justify-between relative z-0">
        <div>
        <p className="text-2xl font-semibold">Catégories</p>
        <span>Organisez vos dépenses avec des catégories personnalisées</span>
        </div>


        <Button 
            variant="danger" 
            icon={<IconPlus size={16} />}
            className="flex flex-row gap-1 bg-blue-500 items-center cursor-pointer text-white rounded-md p-2"
        >
        Nouvelle catégorie
        </Button>
        </div>

      {/* Filtres */}
      <div className="my-10 mb-3.5 flex flex-wrap gap-2.5">
        <div className="flex w-full gap-3 items-center">
            <div className="relative min-w-[200px] flex-1">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B4B1A6]" />
            <input
                className="border w-3/4 rounded-md p-1.5 pl-8 lg:w-full"
                type="text"
                placeholder="Rechercher une catégorie"
            />
            </div>
            <select className="h-full rounded-md border  px-2 text-[15px]">
            <option>Tous les comptes</option>
            </select>
            <select className="h-full  rounded-md border px-2 text-[15px]">
            <option>Toutes catégories</option>
            </select>
            <select className="h-full rounded-md border  px-2 text-[15px]">
            <option>Mai 2026</option>
            </select>

        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-lg border  bg-white">
        {/* En-tête de colonnes */}
        <div className={`${COLS} bg-[#F9F8F4] py-2.5 text-sm font-medium text-[#79776F]`}>
          <div>Date</div>
          <div>Libellé</div>
          <div>Catégorie</div>
          <div>Compte</div>
          <div className="text-right">Montant</div>
          <div />
        </div>

        {/* Ligne */}
        <div className={`${COLS} items-center border-t border-[#E8E6DE] py-3 text-[14px]`}>
          <div className="tabular-nums text-[#79776F]">08/05</div>
          <div className="truncate">Carrefour City</div>
          <div>
            <span className="rounded-xl bg-[#FAECE7] px-2.5 py-[3px] text-xs text-[#712B13]">
              Alimentation
            </span>
          </div>
          <div className="truncate text-sm text-[#79776F]">BNP Courant</div>
          <div className="text-right font-medium tabular-nums text-[#A32D2D]">-42,80 €</div>
          <div className="cursor-pointer text-[#B4B1A6]">
            <IconDots size={15} stroke={2} />
          </div>
        </div>
  
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#E8E6DE] px-3.5 py-3 text-xs text-[#79776F]">
          <span className="tabular-nums">1-25 sur 248</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              className="flex h-7 items-center rounded-md border border-[#DFDDD4] bg-white px-2.5"
            >
              <IconChevronLeft size={14} stroke={2} />
            </button>
            <button
              type="button"
              className="flex h-7 items-center rounded-md border border-[#DFDDD4] bg-white px-2.5"
            >
              <IconChevronRight size={14} stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}