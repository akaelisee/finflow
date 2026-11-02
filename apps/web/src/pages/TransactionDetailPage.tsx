import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconShoppingCart,
  IconBuildingBank,
} from '@tabler/icons-react';

export function TransactionDetailPage() {
  return (
    <main className="min-w-0 px-6 py-5">
      {/* Actions */}
      <div className="mb-1 flex items-center justify-between">
        <button
          type="button"
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
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#E5B4B4] bg-white px-3 text-[13px] text-[#A32D2D]"
          >
            <IconTrash size={14} stroke={2} />
            Supprimer
          </button>
        </div>
      </div>

      {/* En-tête */}
      <div className="flex items-start gap-4 border-b border-[#E8E6DE] py-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FAECE7] text-[#712B13]">
          <IconShoppingCart size={28} stroke={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-medium">Carrefour City</p>
          <p className="mt-1 text-[13px] text-[#79776F]">Alimentation · 8 mai 2026</p>
        </div>
        <p className="shrink-0 text-[28px] font-medium tabular-nums text-[#A32D2D]">-42,80 €</p>
      </div>

      {/* Métadonnées */}
      <div className="grid grid-cols-2 gap-5 border-b border-[#E8E6DE] py-5">
        <div>
          <p className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-[#B4B1A6]">Compte</p>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E6F1FB] text-[#0C447C]">
              <IconBuildingBank size={14} stroke={1.75} />
            </div>
            <span className="text-sm font-medium">Compte courant BNP</span>
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-[#B4B1A6]">Catégorie</p>
          <span className="rounded-xl bg-[#FAECE7] px-2.5 py-[3px] text-xs text-[#712B13]">
            Alimentation
          </span>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-[#B4B1A6]">Date</p>
          <span className="text-sm">Vendredi 8 mai 2026</span>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-[#B4B1A6]">Source</p>
          <span className="rounded-[10px] bg-[#EFF6FD] px-2 py-0.5 text-xs text-[#1C5E9E]">
            Manuel
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="border-b border-[#E8E6DE] py-5">
        <p className="mb-2 text-[11px] uppercase tracking-[0.05em] text-[#B4B1A6]">Notes</p>
        <p className="text-sm leading-relaxed text-[#79776F]">
          Courses de la semaine : légumes, pain, produits laitiers. Ticket dans le dossier
          «&nbsp;reçus mai&nbsp;».
        </p>
      </div>

      {/* Historique */}
      <div className="py-5">
        <p className="mb-3 text-[11px] uppercase tracking-[0.05em] text-[#B4B1A6]">Historique</p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 text-[13px]">
            <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#EFF6FD] text-[#1C5E9E]">
              <IconEdit size={13} stroke={1.75} />
            </div>
            <div className="flex-1">
              <p>
                Catégorie changée : <span className="text-[#B4B1A6] line-through">Autres</span> →
                Alimentation
              </p>
              <p className="mt-0.5 text-xs text-[#B4B1A6]">Il y a 1 heure</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}