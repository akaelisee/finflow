import { IconSearch, IconRocket, IconChevronDown, IconMessageCircle } from '@tabler/icons-react';

export function HelpPage() {
  return (
    <main className="min-w-0 px-6 py-5">
      {/* Recherche */}
      <div className="mb-6 text-center">
        <h2 className="text-[22px]">Comment pouvons-nous vous aider ?</h2>
        <p className="mt-1.5 text-[13px] text-[#79776F]">
          Trouvez rapidement les réponses à vos questions
        </p>
        <div className="relative mx-auto mt-4 max-w-[480px]">
          <IconSearch
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4B1A6]"
          />
          <input
            type="text"
            placeholder="Rechercher dans l'aide…"
            className="h-10 w-full rounded-md border border-[#DFDDD4] pl-10 pr-3 text-[13px]"
          />
        </div>
      </div>

      {/* Guides */}
      <p className="mb-2.5 text-xs uppercase tracking-[0.05em] text-[#B4B1A6]">Guides par thème</p>
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        <div className="cursor-pointer rounded-lg border border-[#E8E6DE] bg-white p-3.5">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FD] text-[#1C5E9E]">
            <IconRocket size={17} stroke={1.75} />
          </div>
          <p className="text-[13px] font-medium">Premiers pas</p>
          <p className="mt-[3px] text-xs text-[#79776F]">
            Créer votre compte, ajouter vos premières transactions
          </p>
        </div>
      </div>

      {/* FAQ */}
      <p className="mb-2.5 text-xs uppercase tracking-[0.05em] text-[#B4B1A6]">
        Questions fréquentes
      </p>
      <div className="mb-5 divide-y divide-[#E8E6DE] rounded-lg border border-[#E8E6DE] bg-white">
        <div className="flex cursor-pointer items-center justify-between px-4 py-3.5">
          <span className="text-[13px] font-medium">Comment importer un relevé bancaire ?</span>
          <IconChevronDown size={15} className="shrink-0 text-[#B4B1A6]" />
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center gap-3.5 rounded-lg bg-[#EFF6FD] p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1C5E9E]">
          <IconMessageCircle size={20} stroke={1.75} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-medium text-[#1C5E9E]">Vous ne trouvez pas la réponse ?</p>
          <p className="mt-0.5 text-xs text-[#1C5E9E]">
            Notre équipe support répond en moins de 24h
          </p>
        </div>
        <button
          type="button"
          className="h-8 shrink-0 rounded-md bg-[#378ADD] px-3 text-xs text-white"
        >
          Contacter
        </button>
      </div>
    </main>
  );
}