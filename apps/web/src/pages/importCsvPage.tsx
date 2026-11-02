import { IconCircleCheck, IconEdit, IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react';

const COLS = 'grid grid-cols-[100px_1fr_140px_100px_32px] gap-3 px-3.5';

export function ImportCsvPage() {
  return (
    <main className="min-w-0 px-6 py-5">
      {/* En-tête */}
      <div className="mb-[18px] flex items-baseline justify-between">
        <div>
          <h2 className="text-xl">Import CSV</h2>
          <p className="mt-[3px] text-[13px] text-[#79776F]">Étape 2/3 · Prévisualisation</p>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            className="h-8 rounded-md border border-[#DFDDD4] bg-white px-3.5 text-[13px]"
          >
            Annuler
          </button>
          <button type="button" className="h-8 rounded-md bg-[#378ADD] px-3.5 text-[13px] text-white">
            Importer 47 transactions
          </button>
        </div>
      </div>

      {/* Bandeau de validation */}
      <div className="mb-[18px] flex items-center gap-2.5 rounded-lg border border-[#BFE3D6] bg-[#E1F5EE] px-3.5 py-3 text-[13px] text-[#0F6E56]">
        <IconCircleCheck size={18} stroke={1.75} className="shrink-0" />
        <span>
          Fichier reconnu : <strong className="font-medium">Boursorama Banque</strong> · 47
          transactions · aucun doublon détecté
        </span>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-lg border border-[#E8E6DE] bg-white">
        {/* En-tête de colonnes */}
        <div className={`${COLS} bg-[#F9F8F4] py-2.5 text-xs font-medium text-[#79776F]`}>
          <div>Date</div>
          <div>Libellé</div>
          <div>Catégorie</div>
          <div className="text-right">Montant</div>
          <div />
        </div>

        {/* Ligne standard */}
        <div className={`${COLS} items-center border-t border-[#E8E6DE] py-3 text-[13px]`}>
          <div className="tabular-nums text-[#79776F]">08/05/26</div>
          <div className="truncate">CARREFOUR CITY PARIS 09</div>
          <div>
            <span className="rounded-xl bg-[#FAECE7] px-2.5 py-[3px] text-xs text-[#712B13]">
              Alimentation
            </span>
          </div>
          <div className="text-right font-medium tabular-nums text-[#A32D2D]">-42,80 €</div>
          <div className="cursor-pointer text-[#B4B1A6]">
            <IconEdit size={15} stroke={2} />
          </div>
        </div>

        {/* Ligne nécessitant une attention */}
        <div
          className={`${COLS} items-center border-t border-[#E8E6DE] bg-[#FDF6E3] py-3 text-[13px]`}
        >
          <div className="tabular-nums text-[#79776F]">03/05/26</div>
          <div className="truncate">VIR RIB INCONNU 4823</div>
          <div>
            <span className="rounded-xl bg-[#F9F8F4] px-2.5 py-[3px] text-xs text-[#7A5A12]">
              Non catégorisé
            </span>
          </div>
          <div className="text-right font-medium tabular-nums text-[#A32D2D]">-120,00 €</div>
          <div className="cursor-pointer text-[#B4B1A6]">
            <IconAlertTriangle size={15} stroke={2} />
          </div>
        </div>

        <div className="border-t border-[#E8E6DE] px-3.5 py-3 text-center text-xs text-[#B4B1A6]">
          … 42 autres transactions
        </div>
      </div>

      <p className="mt-3.5 flex items-center gap-1.5 text-xs text-[#79776F]">
        <IconInfoCircle size={14} stroke={1.75} className="shrink-0" />
        45 transactions catégorisées automatiquement · 2 nécessitent votre attention.
      </p>
    </main>
  );
}